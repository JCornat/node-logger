import * as fs from 'fs';

import { logDirectory, logFilename } from './config';

export function write(log: string): void {
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

  const stream = fs.createWriteStream(`${logDirectory}/${logFilename}`, {flags: 'a'});
  stream.write(log);
  stream.end();
}
