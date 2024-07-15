import {
  NotificationMessage,
  DidChangeTextDocumentParams,
} from "vscode-languageserver-protocol";
import { documents } from "../../documents";
import log from "../../log";

export const didChange = (message: NotificationMessage): void => {
  const params = message.params as DidChangeTextDocumentParams;
  documents.set(params.textDocument.uri, params.contentChanges[0].text);
};
