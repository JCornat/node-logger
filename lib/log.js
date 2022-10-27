"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.critical = exports.warning = exports.error = exports.info = exports.debug = exports.emitter = exports.Severity = void 0;
const events_1 = require("events");
const File = require("./file");
var Severity;
(function (Severity) {
    Severity["debug"] = "debug";
    Severity["info"] = "info";
    Severity["error"] = "error";
    Severity["warning"] = "warning";
    Severity["critical"] = "critical";
})(Severity = exports.Severity || (exports.Severity = {}));
exports.emitter = new events_1.EventEmitter();
function debug(log) {
    log.severity = Severity.debug;
    processLog(log);
}
exports.debug = debug;
function info(log) {
    log.severity = Severity.info;
    processLog(log);
}
exports.info = info;
function error(log) {
    log.severity = Severity.error;
    processLog(log);
}
exports.error = error;
function warning(log) {
    log.severity = Severity.warning;
    processLog(log);
}
exports.warning = warning;
function critical(log) {
    log.severity = Severity.critical;
    processLog(log);
}
exports.critical = critical;
function processLog(data) {
    try {
        const log = formatLog(data);
        exports.emitter.emit('log', log);
        const line = formatLine(log);
        File.write(line);
    }
    catch (error) {
        console.error(error);
    }
}
function formatLog(log) {
    const res = {};
    for (const key of Object.keys(log)) {
        const sanitizedContent = sanitize(log[key]);
        if (sanitizedContent === undefined) { // Remove undefined values
            continue;
        }
        res[key] = sanitizedContent;
    }
    const currentDate = new Date();
    res.date = currentDate.toISOString();
    return res;
}
function sanitize(value) {
    let res;
    switch (typeof value) {
        case 'string':
        case 'number':
        case 'boolean':
        case 'undefined':
            res = value;
            break;
        case 'object':
        default:
            res = JSON.stringify(value);
            break;
    }
    return res;
}
function formatLine(log) {
    return `${JSON.stringify(log)}\n`;
}
//# sourceMappingURL=log.js.map