"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("./http");
const Log = require("./log");
const Redis = require("./redis");
const config_1 = require("./config");
let isSending;
function listenLog() {
    Log.emitter.on('log', (line) => {
        Redis.pushListLog('log', line);
    });
}
exports.listenLog = listenLog;
async function send() {
    if (isSending) {
        console.log('Currently sending log, call canceled');
        return;
    }
    isSending = true;
    try {
        const array = await pullLog();
        const logs = processLogs(array);
        if (Array.isArray(logs) && logs.length > 0) {
            const options = {
                url: config_1.url,
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
            const log = JSON.parse(item);
            logs.push(log);
        }
        catch (error) {
            console.error('Fail parse', error, item);
        }
    }
    return logs;
}
//# sourceMappingURL=send.js.map