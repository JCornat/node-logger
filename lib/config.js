"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.logFilename = exports.logDirectory = void 0;
const path = require("path");
exports.logDirectory = path.join(__dirname, '..', '..', '..', 'log');
exports.logFilename = 'logfile';
function config(options) {
    if (options === null || options === void 0 ? void 0 : options.directory) {
        exports.logDirectory = options.directory;
    }
    if (options === null || options === void 0 ? void 0 : options.filename) {
        exports.logFilename = options.filename;
    }
}
exports.config = config;
//# sourceMappingURL=config.js.map