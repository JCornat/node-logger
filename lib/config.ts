import * as path from 'path';

import { Config } from '../class/config';

export let logDirectory: string = path.join(__dirname, '..', '..', '..', 'log');
export let logFilename: string = 'logfile';

export async function config(options: Config): Promise<void> {
  if (options?.log?.directory) {
    logDirectory = options.log.directory;
  }

  if (options?.log?.filename) {
    logFilename = options.log.filename;
  }
}
