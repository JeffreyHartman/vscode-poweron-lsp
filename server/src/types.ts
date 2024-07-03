import { Position } from 'vscode-languageserver-textdocument';

// src/types.ts
export interface ProcedureInfo {
  name: string;
  range: {
    start: Position;
    end: Position;
  };
}

export interface ProceduresMap {
  [uri: string]: ProcedureInfo[];
}
