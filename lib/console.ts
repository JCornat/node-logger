import * as File from "./file";

export function info(...data: any[]) {
    const type = 'info';
    try {
        File.write(type, aggregate(type, data));
    } catch (error) {
        console.error(error);
        return;
    }
}

export function debug(...data: any[]) {
    const type = 'debug';
    try {
        File.write(type, aggregate(type, data));
    } catch (error) {
        console.error(error);
        return;
    }
}

export function error(...data: any[]) {
    const type = 'error';
    try {
        File.write(type, aggregate(type, data));
    } catch (error) {
        console.error(error);
        return;
    }
}

export function warning(...data: any[]) {
    const type = 'warning';
    try {
        File.write(type, aggregate(type, data));
    } catch (error) {
        console.error(error);
        return;
    }
}

function aggregate(level: string, data: any[]): string {
    let stack = (new Error()).stack.split('\n')[3];
    var regExp = /((\w*)\\\w*\.\w*):(\d*)/i;
    let line = `${(new Date()).toISOString()} - ${regExp.exec(stack)[0]} - `;

    data.map((item, i) => {
        switch (typeof item) {
            case 'string':
            case 'number':
            case 'boolean':
            case 'undefined':
            case null:
                line += item;
                break;
            case 'object':
                line += JSON.stringify(item);
                break;
            default:
                throw (`BAD TYPE ${typeof item}`);
        }
        if (i < data.length - 1) {
            line += `, `;
        }
    });

    switch (level) {
        case 'error':
        case 'warning':
            console.error(line);
            break;
        default:
            console.log(line);
            break;
    }

    line += `\n`;
    return line;
}