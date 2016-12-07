import * as fs from "fs";
const logDirectory = `${__dirname}/../../../log`

export function write(level: string, log: string) {
    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
    }

    let currentDate = new Date(),
        currentYear = currentDate.getUTCFullYear(),
        currentMonth = ((currentDate).getUTCMonth() < 9) ? '0' + ((currentDate).getUTCMonth() + 1) : (currentDate).getUTCMonth() + 1,
        currentDay = ((currentDate).getUTCDate() < 9) ? '0' + ((currentDate).getUTCDate() + 1) : (currentDate).getUTCDate() + 1,
        extension = (level === 'info') ? `.log` : `.${level}.log`,
        fileName = `${currentYear}${currentMonth}${currentDay}${extension}`,
        stream = fs.createWriteStream(`${logDirectory}/${fileName}`, {flags: 'a'});
    stream.write(log);
    stream.end();
}