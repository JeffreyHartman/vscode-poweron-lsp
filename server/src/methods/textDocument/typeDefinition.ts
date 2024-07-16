import {
  RequestMessage,
  Location,
  DefinitionParams,
} from "vscode-languageserver-protocol";
import log from "../../log";

export const typeDefinition = (message: RequestMessage): Location => {
  const params = message.params as DefinitionParams;
  log.write({ typeDefinition: params });
  // TODO: implement type definition
  const location = {
    uri: "file:///c:/temp/test.txt",
    range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
  };
  return location;
};
