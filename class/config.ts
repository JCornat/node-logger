export class Config {
  public log?: { directory?: string, filename?: string };
  public redis?: { host: string, port: number };
  public url?: string;
  public interval?: number;
  public maxLines?: number;
}
