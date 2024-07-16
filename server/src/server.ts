import log from "./log";
import { initialize } from "./methods/initialize";
import { completion } from "./methods/textDocument/completion";
import { didChange } from "./methods/textDocument/didChange";
import { typeDefinition } from "./methods/textDocument/typeDefinition";
import {
  RequestMessage,
  NotificationMessage,
} from "vscode-languageserver-protocol";

type RequestMethod = (
  message: RequestMessage
) =>
  | ReturnType<typeof initialize>
  | ReturnType<typeof completion>
  | ReturnType<typeof typeDefinition>;

type NotificationMethod = (message: NotificationMessage) => void;

const methodLookup: Record<string, RequestMethod | NotificationMethod> = {
  initialize,
  "textDocument/completion": completion,
  "textDocument/didChange": didChange,
  "textDocument/typeDefinition": typeDefinition,
};

const respond = (
  id: RequestMessage["id"],
  result: object | null,
  startTime: [number, number]
) => {
  const message = JSON.stringify({ id, result });
  const messageLength = Buffer.byteLength(message, "utf-8");
  const [seconds, nanoseconds] = process.hrtime(startTime);
  const durationMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);
  const header = `Content-Length: ${message.length}\r\nDuration: ${durationMs} milliseconds\r\n\r\n`;

  log.write(header + message);
  process.stdout.write(header + message);
};

let buffer = ""; // Buffer to accumulate chunks of data as they are received

process.stdin.on("data", (chunk) => {
  buffer += chunk;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // Check for the content-length header
    const lengthMatch = buffer.match(/Content-Length: (\d+)\r\n/);
    if (!lengthMatch) {
      break;
    }

    const contentLength = parseInt(lengthMatch[1], 10);
    // Start of the message is after a double newline
    const messageStart = buffer.indexOf("\r\n\r\n") + 4;

    // Continue unless the full message has been received
    if (buffer.length < messageStart + contentLength) {
      break;
    }

    const rawMessage = buffer.slice(messageStart, messageStart + contentLength);
    const message = JSON.parse(rawMessage);

    log.write({ id: message.id, method: message.method });

    const method = methodLookup[message.method];
    if (method) {
      const startTime = process.hrtime(); // Start timer before method execution
      const result = method(message);
      if (result !== undefined) {
        respond(message.id, result, startTime);
      }
    }

    // Remove the processed message from the buffer
    buffer = buffer.slice(messageStart + contentLength);
  }
});
