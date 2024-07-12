import { RequestMessage } from "../../server";
import * as fs from "fs";
import * as path from "path";
import log from "../../log";

interface CompletionItem {
  label: string;
  detail?: string;
  documentaion?: string;
}

interface CompletionList {
  isIncomplete: boolean;
  items: CompletionItem[];
}
const BASE_PATH = path.resolve(__dirname, "..", "..");
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
  try {
    return {
      isIncomplete: false,
      items,
    };
  } catch (e) {
    log.write(e);
    return {
      isIncomplete: false,
      items: [],
    };
  }
};
