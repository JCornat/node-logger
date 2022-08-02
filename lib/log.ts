import { EventEmitter } from 'events';

import { Log } from '../class/log';
import * as File from './file';

export enum Severity {
  debug = 'debug',
  info = 'info',
  error = 'error',
  warning = 'warning',
  critical = 'critical',
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

function processLog(log: Log): void {
  try {
    const line = format(log);
    File.write(line);
    emitter.emit('log', log);
  } catch (error) {
    console.error(error);
  }
}

function format(log: Log): string {
  const currentDate = new Date();
  log.date = currentDate.toISOString();

  log.user = sanitize(log.user);
  log.message = sanitize(log.message);
  log.action = sanitize(log.action);
  log.status = sanitize(log.status);

  const order = [
    'date',
    'severity',
    'user',
    'action',
    'message',
    'status',
  ];

  let string = JSON.stringify(log, order);
  string += `\n`;

  return string;
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
