import * as File from './file';

export function info(...data: any[]): void {
  processLog('info', data);
}

export function debug(...data: any[]): void {
  processLog('debug', data);
}

export function error(...data: any[]): void {
  processLog('error', data);
}

export function warning(...data: any[]): void {
  processLog('warning', data);
}

function processLog(level: string, data: any[]): void {
  try {
    const line = aggregate(level, data);
    File.write(level, line);
  } catch (error) {
    console.error(error);
  }
}

function aggregate(level: string, data: any[]): string {
  const res = [];

  const currentDate = new Date();
  res.push(currentDate.toISOString());

  for (const item of data) {
    switch (typeof item) {
      case 'string':
      case 'number':
      case 'boolean':
      case 'undefined':
      case null:
        res.push(item);
        break;
      case 'object':
        res.push(JSON.stringify(item));
        break;
      default:
        throw new Error(`BAD TYPE ${typeof item}`);
    }
  }

  let string = res.join(', ');

  string += `\n`;

  return string;
}
