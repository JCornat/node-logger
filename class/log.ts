import { Severity } from '../lib/log';

export class Log {
  public date?: string;
  public severity?: Severity;
  public user?: string;
  public action?: string;
  public message?: string;
  public status?: number;
}
