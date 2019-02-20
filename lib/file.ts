import * as fs from 'fs';

const logDirectory = `${__dirname}/../../../log`;

export function write(level: string, log: string) {
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

  let stream = fs.createWriteStream(`${logDirectory}/logfile`, {flags: 'a'});
  stream.write(log);
  stream.end();
}
