import * as File from "./file";

export function info(...data: any[]) {
    const type = 'info';
    try {
        File.write(type, aggregate(type, data));
    } catch (error) {
        console.error(error);
    }
}

export function debug(...data: any[]) {
    const type = 'debug';
    try {
        File.write(type, aggregate(type, data));
    } catch (error) {
        console.error(error);
    }
}

export function error(...data: any[]) {
    const type = 'error';
    try {
        File.write(type, aggregate(type, data));
    } catch (error) {
        console.error(error);
    }
}

export function warning(...data: any[]) {
    const type = 'warning';
    try {
        File.write(type, aggregate(type, data));
    } catch (error) {
        console.error(error);
    }
}

function aggregate(level: string, data: any[]): string {
    let stack: string = (new Error()).stack.split('\n')[3];
    let windowsRegExp: RegExp = /((\w*)\\\w*\.\w*):(\d*)/i;
    let linuxRegExp: RegExp = /((\w*)\/\w*\.\w*):(\d*)/i;
    let fileLine = ' - ';
    if (windowsRegExp.exec(stack)) {
        fileLine = (windowsRegExp.exec(stack))[0] + fileLine;
    } else if (linuxRegExp.exec(stack)) {
        fileLine = (linuxRegExp.exec(stack))[0] + fileLine;
    }
    let string = `${(new Date()).toISOString()} - ${fileLine}`;

    data.map((item, i) => {
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
                throw (`BAD TYPE ${typeof item}`);
        }
        if (i < data.length - 1) {
            string += `, `;
        }
    });

    string += `\n`;
    return string;
}