import * as fs from "fs";

const logDirectory = `${__dirname}/../../log`

export function write(...data: any[]) {
    try {
        let log = aggregate(data);
        console.log(log);
    } catch (error) {
        console.error(error);
        return;
    }

    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
    }

    let fileName = `${(new Date()).getUTCFullYear()}${(new Date()).getUTCMonth() + 1}${(new Date()).getUTCDate()}.log`
    let stream = fs.createWriteStream(`${logDirectory}/${fileName}`, {flags: 'a'});
    stream.write(data);
    stream.end();
}

export function writeError(...data: any[]) {
    try {
        let log = aggregate(data);
        console.error(log);
    } catch (error) {
        console.error(error);
        return;
    }

    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
    }

    let fileName = `${(new Date()).getUTCFullYear()}${(new Date()).getUTCMonth() + 1}${(new Date()).getUTCDate()}.log`
    let stream = fs.createWriteStream(`${logDirectory}/${fileName}`, {flags: 'a'});
    stream.write(data);
    stream.end();
}

function aggregate(...data: any[]): string {
    let tmp = `${(new Date()).toISOString()} - `;
    data.map((item) => {
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
                throw (`BAD TYPE ${typeof item}`);
        }
    });

    return tmp;
}