"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const File = require("./file");
exports.emitter = new events_1.EventEmitter();
function debug(log) {
    log.severity = 'debug';
    processLog(log);
}
exports.debug = debug;
function info(log) {
    log.severity = 'info';
    processLog(log);
}
exports.info = info;
function error(log) {
    log.severity = 'error';
    processLog(log);
}
exports.error = error;
function warning(log) {
    log.severity = 'warning';
    processLog(log);
}
exports.warning = warning;
function critical(log) {
    log.severity = 'critical';
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
//# sourceMappingURL=console.js.map