import {
  NotificationMessage,
  DidOpenTextDocumentParams,
} from "vscode-languageserver-protocol";
import { documents } from "../../documents";
import log from "../../log";

export const didOpen = (message: NotificationMessage): void => {
  const params = message.params as DidOpenTextDocumentParams;
  documents.set(params.textDocument.uri, params.textDocument.text);

  // below code is not ready.
  // TODO: store tokens somewhere and track by file.
  // test start
  let procedures: {
    [key: string]: { name: string; line: number; position: number };
  } = {};

  procedures = parseProcedures(params.textDocument.text);
  log.write({ procedures: procedures });
  // test end
};

// test function parse procedures from the text
function parseProcedures(test: string) {
  const procRegex = /^PROCEDURE\s+(\w+)/gm;
  let matches: RegExpExecArray | null;
  const result: {
    [key: string]: { name: string; line: number; position: number };
  } = {};
  while ((matches = procRegex.exec(test)) !== null) {
    const name = matches[1];
    const position = matches.index;
    const line = matches.input.slice(0, position).split("\n").length - 1;
    result[name] = { name, line, position };
  }
  return result;
}
