"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const logDirectory = `${__dirname}/../../../log`;
function write(log) {
    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
    }
    let stream = fs.createWriteStream(`${logDirectory}/logfile`, { flags: 'a' });
    stream.write(log);
    stream.end();
}
exports.write = write;
//# sourceMappingURL=file.js.map