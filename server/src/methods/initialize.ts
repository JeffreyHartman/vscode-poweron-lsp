import { TextDocumentSyncKind } from "vscode-languageserver-protocol";
import {
  RequestMessage,
  InitializeResult,
} from "vscode-languageserver-protocol";

export const initialize = (msg: RequestMessage): InitializeResult => {
  return {
    capabilities: {
      completionProvider: {},
      textDocumentSync: TextDocumentSyncKind.Full,
      definitionProvider: true,
    },
    serverInfo: {
      name: "PowerOn Language Server",
      version: "0.0.1",
    },
  };
};
