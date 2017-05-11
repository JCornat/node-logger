import * as fs from "fs";
const logDirectory = `${__dirname}/../../../log`

export function write(level: string, log: string) {
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

  let currentDate = new Date();
  let currentYear = currentDate.getUTCFullYear();
  let currentMonth = (currentDate.getUTCMonth() < 10) ? '0' + (currentDate.getUTCMonth() + 1) : currentDate.getUTCMonth() + 1;
  let currentDay = (currentDate.getUTCDate() < 10) ? '0' + currentDate.getUTCDate() : currentDate.getUTCDate();

  let extension = (level === 'info') ? `.log` : `.${level}.log`;
  let fileName = `${currentYear}${currentMonth}${currentDay}${extension}`;

  let stream = fs.createWriteStream(`${logDirectory}/${fileName}`, {flags: 'a'});
  stream.write(log);
  stream.end();
}
