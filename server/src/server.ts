import log from "./log";
import { initialize } from "./methods/initialize";

interface Message {
  jsonrpc: string;
}

export interface RequestMessage extends Message {
  id: number | string;
  method: string;
  params?: unknown[] | object;
}

type RequestMethod = (message: RequestMessage) => unknown;
const methodLookup: Record<string, RequestMethod> = {
  initialize,
};

const respond = (id: RequestMessage["id"], result: unknown) => {
  const message = JSON.stringify({ id, result });
  const messageLength = Buffer.byteLength(message, "utf-8");
  const header = `Content-Length: ${message.length}\r\n\r\n`;

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
      respond(message.id, method(message));
    }

    // Remove the processed message from the buffer
    buffer = buffer.slice(messageStart + contentLength);
  }
});
