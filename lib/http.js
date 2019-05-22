"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const https = require('https');
async function post(options) {
    return new Promise((resolve, reject) => {
        const url = new url_1.URL(options.url);
        const data = JSON.stringify(options.data);
        const httpOptions = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
            },
        };
        const request = https.request(httpOptions, (response) => {
            let data;
            response.on('data', (chunk) => {
                console.log('chunk', chunk);
                data += chunk;
            });
            response.on('end', () => {
                resolve(JSON.parse(data));
            });
        });
        request.on('error', (error) => {
            console.error(error);
            reject(error);
        });
        request.write(data);
        request.end();
    });
}
exports.post = post;
//# sourceMappingURL=http.js.map