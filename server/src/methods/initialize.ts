import { RequestMessage } from "../server";
type ServerCapabilities = Record<string, unknown>;

interface InitializeResult {
  capabilities: ServerCapabilities;
  serverInfo?: {
    name: string;
    version?: string;
  };
}

export const initialize = (msg: RequestMessage): InitializeResult => {
  return {
    capabilities: { completionProvider: {} },
    serverInfo: {
      name: "PowerOn Language Server",
      version: "0.0.1",
    },
  };
};
