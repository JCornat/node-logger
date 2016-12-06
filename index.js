"use strict";
var fs = require("fs");
var logDirectory = __dirname + "/../../log";
function write() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i - 0] = arguments[_i];
    }
    try {
        var log = aggregate(data);
        console.error(log);
    }
    catch (error) {
        console.error(error);
        return;
    }
    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
    }
    var fileName = "" + (new Date()).getUTCFullYear() + ((new Date()).getUTCMonth() + 1) + (new Date()).getUTCDate() + ".log";
    var stream = fs.createWriteStream(logDirectory + "/" + fileName, { flags: 'a' });
    stream.write(data);
    stream.end();
}
exports.write = write;
function writeError() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i - 0] = arguments[_i];
    }
    try {
        var log = aggregate(data);
        console.error(log);
    }
    catch (error) {
        console.error(error);
        return;
    }
    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
    }
    var fileName = "" + (new Date()).getUTCFullYear() + ((new Date()).getUTCMonth() + 1) + (new Date()).getUTCDate() + ".log";
    var stream = fs.createWriteStream(logDirectory + "/" + fileName, { flags: 'a' });
    stream.write(data);
    stream.end();
}
exports.writeError = writeError;
function aggregate() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i - 0] = arguments[_i];
    }
    var tmp = (new Date()).toISOString() + " - ";
    data.map(function (item) {
        switch (typeof item) {
            case 'string':
            case 'number':
            case 'boolean':
            case 'undefined':
            case null:
                tmp += data;
                break;
            case 'object':
                tmp += JSON.stringify(data);
                break;
            default:
                throw ("BAD TYPE " + typeof item);
        }
    });
    return tmp;
}
