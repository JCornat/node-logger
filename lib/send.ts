import * as Http from './http';
import * as Log from './log';
import * as Redis from './redis';

let isSending: boolean;
let url: string;
let suffix: any;

export async function config(options: {suffix: any, host: string, port: number, url: string}): Promise<void> {
  suffix = options.suffix;
  url = options.url;

  const redisOptions = {host: options.host, port: options.port};
  await Redis.connect(redisOptions);

  listenLog();
}

function listenLog(): void {
  Log.emitter.on('log', (line) => {
    Redis.pushListLog('log', line);
  });
}

export async function send(): Promise<void> {
  if (isSending) {
    return;
  }

  isSending = true;

  try {
    const array = await pullLog();
    const logs = processLogs(array);

    if (Array.isArray(logs) && logs.length > 0) {
      const options = {
        url,
        data: {logs},
      };

      await Http.post(options);
      Redis.trimListLog('log', logs.length, -1);
    }
  } catch (error) {
    console.error('Log.send', error);
  } finally {
    isSending = false;
  }
}

async function pullLog(): Promise<any[]> {
  return await Redis.getRangeListLog('log', 0, 100);
}

function processLogs(data: any[]): any[] {
  const logs = [];

  for (const item of data) {
    try {
      const log = processLog(item);
      logs.push(log);
    } catch (error) {
      console.error('Fail parse', error, item);
    }
  }

  return logs;
}

function processLog(data: string) {
  const log = JSON.parse(data);

  if (suffix) {
    for (const key of Object.keys(suffix)) {
      log.key = suffix;
    }
  }

  return log;
}
