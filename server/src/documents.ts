import { DocumentUri, Location } from "vscode-languageserver-protocol";
export const documents = new Map<DocumentUri, string>();
// store a list of locations for type definitions
export const typeDefinitions: Location[] = [];
