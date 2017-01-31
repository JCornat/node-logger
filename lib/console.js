"use strict";
var File = require("./file");
function info() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i - 0] = arguments[_i];
    }
    var type = 'info';
    try {
        File.write(type, aggregate(type, data));
    }
    catch (error) {
        console.error(error);
        return;
    }
}
exports.info = info;
function debug() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i - 0] = arguments[_i];
    }
    var type = 'debug';
    try {
        File.write(type, aggregate(type, data));
    }
    catch (error) {
        console.error(error);
        return;
    }
}
exports.debug = debug;
function error() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i - 0] = arguments[_i];
    }
    var type = 'error';
    try {
        File.write(type, aggregate(type, data));
    }
    catch (error) {
        console.error(error);
        return;
    }
}
exports.error = error;
function warning() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i - 0] = arguments[_i];
    }
    var type = 'warning';
    try {
        File.write(type, aggregate(type, data));
    }
    catch (error) {
        console.error(error);
        return;
    }
}
exports.warning = warning;
function aggregate(level, data) {
    var stack = (new Error()).stack.split('\n')[3];
    var windowsRegExp = /((\w*)\\\w*\.\w*):(\d*)/i;
    var linuxRegExp = /((\w*)\/\w*\.\w*):(\d*)/i;
    var fileLine = ' - ';
    if (windowsRegExp.exec(stack)) {
        fileLine = (windowsRegExp.exec(stack))[0] + fileLine;
    }
    else if (linuxRegExp.exec(stack)) {
        fileLine = (linuxRegExp.exec(stack))[0] + fileLine;
    }
    var string = (new Date()).toISOString() + " - " + fileLine;
    data.map(function (item, i) {
        switch (typeof item) {
            case 'string':
            case 'number':
            case 'boolean':
            case 'undefined':
            case null:
                string += item;
                break;
            case 'object':
                string += JSON.stringify(item);
                break;
            default:
                throw ("BAD TYPE " + typeof item);
        }
        if (i < data.length - 1) {
            string += ", ";
        }
    });
    switch (level) {
        case 'error':
        case 'warning':
            console.error(string);
            break;
        default:
            console.log(string);
            break;
    }
    string += "\n";
    return string;
}
