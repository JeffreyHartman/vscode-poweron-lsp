import * as fs from "fs";
import * as path from "path";
import { documents } from "../../documents";
import log from "../../log";
import {
  CompletionItem,
  CompletionList,
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

const items = readKeywords();

export const completion = (message: RequestMessage): CompletionList => {
  return {
    isIncomplete: false,
    items,
  };
};
