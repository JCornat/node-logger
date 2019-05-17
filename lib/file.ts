import * as fs from 'fs';
import { EventEmitter } from 'events';

const logDirectory = `${__dirname}/../../../log`;
const emitter = new EventEmitter();

export function write(log: string) {
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

  let stream = fs.createWriteStream(`${logDirectory}/logfile`, {flags: 'a'});
  stream.write(log);
  stream.end();

  emitter.emit('log', log);
}
