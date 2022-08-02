import * as Config from './config';
import * as Http from './http';
import * as Log from './log';
import * as Redis from './redis';

let isSending: boolean;

export function listenLog(): void {
  Log.emitter.on('log', (line) => {
    Redis.pushListLog('log', line);
  });
}

export async function send(): Promise<void> {
  if (isSending) {
    console.log('Currently sending log, call canceled');
    return;
  }

  isSending = true;

  try {
    const array = await pullLog();
    const logs = processLogs(array);

    if (Array.isArray(logs) && logs.length > 0) {
      const options = {
        url: Config.url,
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

async function pullLog(): Promise<string[]> {
  return await Redis.getRangeListLog('log', 0, Config.maxLines);
}

function processLogs(data: string[]): any[] {
  const logs = [];

  for (const item of data) {
    try {
      const log = JSON.parse(item);
      logs.push(log);
    } catch (error) {
      console.error('Fail parse', error, item);
    }
  }

  return logs;
}
