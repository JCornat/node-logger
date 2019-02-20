"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const File = require("./file");
function info(...data) {
    processLog('info', data);
}
exports.info = info;
function debug(...data) {
    processLog('debug', data);
}
exports.debug = debug;
function error(...data) {
    processLog('error', data);
}
exports.error = error;
function warning(...data) {
    processLog('warning', data);
}
exports.warning = warning;
function processLog(level, data) {
    try {
        const line = aggregate(level, data);
        File.write(level, line);
    }
    catch (error) {
        console.error(error);
    }
}
function aggregate(level, data) {
    const res = [];
    const currentDate = new Date();
    res.push(currentDate.toISOString());
    for (const item of data) {
        switch (typeof item) {
            case 'string':
            case 'number':
            case 'boolean':
            case 'undefined':
            case null:
                res.push(item);
                break;
            case 'object':
                res.push(JSON.stringify(item));
                break;
            default:
                throw new Error(`BAD TYPE ${typeof item}`);
        }
    }
    let string = res.join(', ');
    string += os.EOL;
    return string;
}
//# sourceMappingURL=console.js.map