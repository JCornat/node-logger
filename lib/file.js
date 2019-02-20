"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const logDirectory = `${__dirname}/../../../log`;
function write(level, log) {
    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
    }
    let currentDate = new Date();
    let currentYear = currentDate.getUTCFullYear();
    let currentMonth = (currentDate.getUTCMonth() < 10) ? '0' + (currentDate.getUTCMonth() + 1) : currentDate.getUTCMonth() + 1;
    let currentDay = (currentDate.getUTCDate() < 10) ? '0' + currentDate.getUTCDate() : currentDate.getUTCDate();
    let extension = (level === 'info') ? `.log` : `.${level}.log`;
    let fileName = `${currentYear}${currentMonth}${currentDay}${extension}`;
    let stream = fs.createWriteStream(`${logDirectory}/${fileName}`, { flags: 'a' });
    stream.write(log);
    stream.end();
}
exports.write = write;
//# sourceMappingURL=file.js.map