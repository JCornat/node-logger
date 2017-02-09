"use strict";
var fs = require("fs");
var logDirectory = __dirname + "/../../../log";
function write(level, log) {
    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
    }
    var currentDate = new Date();
    var currentYear = currentDate.getUTCFullYear();
    var currentMonth = (currentDate.getUTCMonth() < 10) ? '0' + (currentDate.getUTCMonth() + 1) : currentDate.getUTCMonth() + 1;
    var currentDay = (currentDate.getUTCDate() < 10) ? '0' + currentDate.getUTCDate() : currentDate.getUTCDate();
    var extension = (level === 'info') ? ".log" : "." + level + ".log";
    var fileName = "" + currentYear + currentMonth + currentDay + extension;
    var stream = fs.createWriteStream(logDirectory + "/" + fileName, { flags: 'a' });
    stream.write(log);
    stream.end();
}
exports.write = write;
