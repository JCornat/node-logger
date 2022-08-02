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
function processLog(log) {
    try {
        const line = format(log);
        File.write(line);
        exports.emitter.emit('log', log);
    }
    catch (error) {
        console.error(error);
    }
}
function format(log) {
    const currentDate = new Date();
    log.date = currentDate.toISOString();
    log.user = sanitize(log.user);
    log.message = sanitize(log.message);
    log.action = sanitize(log.action);
    log.status = sanitize(log.status);
    const order = [
        'date',
        'severity',
        'user',
        'action',
        'message',
        'status',
    ];
    let string = JSON.stringify(log, order);
    string += `\n`;
    return string;
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
//# sourceMappingURL=log.js.map