"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("redis");
let logClient;
async function connect(options) {
    logClient = redis.createClient(options);
    await waitRedisConnection(logClient);
}
exports.connect = connect;
function waitRedisConnection(client) {
    return new Promise(async (resolve, reject) => {
        client.on('error', (error) => {
            console.error(error);
            reject();
        });
        client.on('ready', () => {
            resolve();
        });
    });
}
function pushListLog(list, value) {
    pushListRedis(logClient, list, value);
}
exports.pushListLog = pushListLog;
function pushListRedis(client, list, value) {
    const string = JSON.stringify(value);
    client.rpush(list, string);
}
exports.pushListRedis = pushListRedis;
async function getRangeListLog(list, start = 0, stop = 100) {
    return await getRangeListRedis(logClient, list, start, stop);
}
exports.getRangeListLog = getRangeListLog;
function getRangeListRedis(client, list, start = 0, stop = 100) {
    return new Promise((resolve, reject) => {
        client.lrange(list, start, stop, (error, response) => {
            if (error) {
                return reject(error);
            }
            resolve(response);
        });
    });
}
exports.getRangeListRedis = getRangeListRedis;
function trimListLog(list, start = 0, stop = -1) {
    trimListRedis(logClient, list, start, stop);
}
exports.trimListLog = trimListLog;
function trimListRedis(client, list, start = 0, stop = -1) {
    client.ltrim(list, start, stop);
}
exports.trimListRedis = trimListRedis;
//# sourceMappingURL=redis.js.map