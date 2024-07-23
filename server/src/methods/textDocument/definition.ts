import {
  RequestMessage,
  Location,
  DefinitionParams,
} from "vscode-languageserver-protocol";
import log from "../../log";
import { documents } from "../../documents";

export const definition = (message: RequestMessage): Location | null => {
  const params = message.params as DefinitionParams;
  const content = documents.get(params.textDocument.uri);
  //log.write({ params: params });
  if (!content) {
    return null;
  }

  const currentLine = content.split("\n")[params.position.line];
  const currentWord = getWordAtPosition(currentLine, params.position.character);

  log.write({ define: { currentWord } });

  const location = {
    uri: "file:///c:/temp/test.txt",
    range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
  };
  return location;
};

function getWordAtPosition(text: string, position: number): string | null {
  // identify word boundaries
  const regex = /\b\w+\b/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Check if the position is within the bounds of the current match
    if (match.index <= position && regex.lastIndex > position) {
      return match[0];
    }
  }

  return null; // Return null if no word is found at the position
}
