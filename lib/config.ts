import * as Redis from './redis';
import * as Send from './send';

export let url: string;
export let logDirectory: string;
export let logFilename: string;
export let interval: number;
export let maxLines: number;

export async function config(options: { log?: { directory?: string, filename?: string }, redis?: { host: string, port: number }, url?: string, interval?: number, maxLines?: number }): Promise<void> {
  logDirectory = (options.log && options.log.directory) ? options.log.directory : `${__dirname}/../../../log`;
  logFilename = (options.log && options.log.filename) ? options.log.filename : 'logfile';
  interval = (options.interval) ? options.interval : 1000 * 60;
  maxLines = (options.maxLines) ? options.maxLines : 100;

  if (options.redis) {
    const redisOptions = {host: options.redis.host, port: options.redis.port};
    await Redis.connect(redisOptions);

    Send.listenLog();

    if (options.url) {
      url = options.url;

      setInterval(() => {
        Send.send();
      }, interval);
    }
  }
}
