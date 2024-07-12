import * as fs from "fs";
import * as path from "path";
import * as os from "os";

// Get the system's temporary directory
const tempDir = os.tmpdir();

// Define the log file path
const logFilePath = path.join(tempDir, "lsp.log");

// Create a write stream for the log file
const log = fs.createWriteStream(logFilePath, { flags: "a" });

export default {
  write: (msg: object | unknown) => {
    if (typeof msg === "object") {
      log.write(JSON.stringify(msg));
    } else {
      log.write(msg);
    }
    log.write("\n");
  },
};
