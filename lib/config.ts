import * as path from 'path';

import { Config } from '../class/config';

export let logDirectory: string = path.join(__dirname, '..', '..', '..', 'log');
export let logFilename: string = 'logfile';

export function config(options: Config): void {
  if (options?.directory) {
    logDirectory = options.directory;
  }

  if (options?.filename) {
    logFilename = options.filename;
  }
}
