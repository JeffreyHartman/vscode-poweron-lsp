import * as fs from "fs";
import * as path from "path";
import { documents } from "../../documents";
import log from "../../log";
import {
  CompletionItem,
  CompletionList,
  CompletionParams,
  RequestMessage,
} from "vscode-languageserver-protocol";

const BASE_PATH = path.resolve(__dirname, "..", ".."); // Base path of the extension
// Find the keywords.txt file in the resources folder
const readKeywords = (): CompletionItem[] => {
  const keywordsPath = path.resolve(
    BASE_PATH,
    "..",
    "..",
    "resources",
    "keywords.txt"
  );
  const data = fs.readFileSync(keywordsPath, "utf-8");
  const lines = data.split("\r\n");

  const items: CompletionItem[] = lines
    .map((line) => {
      // Remove non-ASCII characters
      line = line.replace(/[^\x00-\x7F]/g, "");
      const [label, detail, documentation] = line.split("|");
      return { label, detail, documentation };
    })
    .filter((item) => item.label); // Filter out any empty lines

  return items;
};

const words = readKeywords();

export const completion = (message: RequestMessage): CompletionList => {
  const params = message.params as CompletionParams;
  const content = documents.get(params.textDocument.uri);

  if (!content) {
    return { isIncomplete: false, items: [] };
  }

  const currentLine = content.split("\n")[params.position.line];
  const currentCharacter = currentLine.slice(0, params.position.character);
  const wordPrefix = currentCharacter.replace(/.*\W(.*?)/, "$1");

  //log.write({ completion: { currentLine, currentCharacter, wordPrefix } });

  const items = words.filter((word) => word.label.startsWith(wordPrefix));

  return {
    isIncomplete: false, // We should never have too many results that we need to send incomplete
    items,
  };
};
