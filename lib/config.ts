import * as path from 'path';

import { Config } from '../class/config';

export let logDirectory: string;
export let logFilename: string;

export async function config(options: Config): Promise<void> {
  logDirectory = (options.log && options.log.directory) ? options.log.directory : path.join(__dirname, '..', '..', '..', 'log');
  logFilename = (options.log && options.log.filename) ? options.log.filename : 'logfile';
}
