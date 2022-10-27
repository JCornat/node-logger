import { EventEmitter } from 'events';

import * as File from './file';

export enum Severity {
  debug = 'debug',
  info = 'info',
  error = 'error',
  warning = 'warning',
  critical = 'critical',
}

export interface Log {
  date?: string;
  severity?: Severity;
  userModel?: { id: number, type: number };
  action?: string;
  message?: string;
  status?: string | number;
  [key: string]: any;
}

export const emitter = new EventEmitter();

export function debug(log: Log): void {
  log.severity = Severity.debug;
  processLog(log);
}

export function info(log: Log): void {
  log.severity = Severity.info;
  processLog(log);
}

export function error(log: Log): void {
  log.severity = Severity.error;
  processLog(log);
}

export function warning(log: Log): void {
  log.severity = Severity.warning;
  processLog(log);
}

export function critical(log: Log): void {
  log.severity = Severity.critical;
  processLog(log);
}

function processLog(data: Log): void {
  try {
    const log = formatLog(data);
    emitter.emit('log', log);

    const line = formatLine(log);
    File.write(line);
  } catch (error) {
    console.error(error);
  }
}

function formatLog(log: Log): Log {
  const res: Log = {};
  for (const key of Object.keys(log)) {
    const sanitizedContent = sanitize(log[key]);
    if (sanitizedContent === undefined) { // Remove undefined values
      continue;
    }

    res[key] = sanitizedContent;
  }

  const currentDate = new Date();
  res.date = currentDate.toISOString();

  return res;
}

function sanitize(value: any): any {
  let res;

  switch (typeof value) {
    case 'string':
    case 'number':
    case 'boolean':
    case 'undefined':
      res = value;
      break;
    case 'object':
    default:
      res = JSON.stringify(value);
      break;
  }

  return res;
}

function formatLine(log: Log): string {
  return `${JSON.stringify(log)}\n`;
}
