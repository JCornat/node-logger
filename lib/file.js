"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.write = void 0;
const fs = require("fs");
const config_1 = require("./config");
function write(log) {
    if (!fs.existsSync(config_1.logDirectory)) {
        fs.mkdirSync(config_1.logDirectory);
    }
    let stream = fs.createWriteStream(`${config_1.logDirectory}/${config_1.logFilename}`, { flags: 'a' });
    stream.write(log);
    stream.end();
}
exports.write = write;
//# sourceMappingURL=file.js.map