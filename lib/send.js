"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("./http");
const Log = require("./log");
const Redis = require("./redis");
let isSending;
let url;
let suffix;
async function config(options) {
    suffix = options.suffix;
    url = options.url;
    const redisOptions = { host: options.host, port: options.port };
    await Redis.connect(redisOptions);
    listenLog();
}
exports.config = config;
function listenLog() {
    Log.emitter.on('log', (line) => {
        Redis.pushListLog('log', line);
    });
}
async function send() {
    if (isSending) {
        return;
    }
    isSending = true;
    try {
        const array = await pullLog();
        const logs = processLogs(array);
        if (Array.isArray(logs) && logs.length > 0) {
            const options = {
                url,
                data: { logs },
            };
            await Http.post(options);
            Redis.trimListLog('log', logs.length, -1);
        }
    }
    catch (error) {
        console.error('Log.send', error);
    }
    finally {
        isSending = false;
    }
}
exports.send = send;
async function pullLog() {
    return await Redis.getRangeListLog('log', 0, 100);
}
function processLogs(data) {
    const logs = [];
    for (const item of data) {
        try {
            const log = processLog(item);
            logs.push(log);
        }
        catch (error) {
            console.error('Fail parse', error, item);
        }
    }
    return logs;
}
function processLog(data) {
    const log = JSON.parse(data);
    if (suffix) {
        for (const key of Object.keys(suffix)) {
            log.key = suffix;
        }
    }
    return log;
}
//# sourceMappingURL=send.js.map