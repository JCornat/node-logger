import * as Redis from './redis';
import * as Send from './send';

export let url: string;
export let logDirectory: string;
export let logFilename: string;
export let interval: number;
export let maxLines: number;

export async function config(options: { log?: { directory?: string, filename?: string }, redis?: { host: string, port: number }, url?: string, interval?: number, maxLines?: number }): Promise<void> {
  if (options.log && options.log.directory) {
    logDirectory = options.log.directory;
  } else {
    logDirectory = `${__dirname}/../../../log`;
  }

  if (options.log && options.log.filename) {
    logFilename = options.log.filename;
  } else {
    logFilename = 'logfile';
  }

  if (options.interval) {
    interval = options.interval;
  } else {
    interval = 1000 * 60;
  }

  if (options.maxLines) {
    maxLines = options.maxLines;
  } else {
    maxLines = 100;
  }

  if (options.redis) {
    const redisOptions = {host: options.redis.host, port: options.redis.port};
    await Redis.connect(redisOptions);

    Send.listenLog();
  }

  if (options.url) {
    url = options.url;

    setInterval(() => {
      Send.send();
    }, interval);
  }
}
