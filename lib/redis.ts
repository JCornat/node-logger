import { RedisClient } from 'redis';
import * as redis from 'redis';

let logClient: RedisClient;

export async function connect(options: {host: string, port: number}): Promise<void> {
  logClient = redis.createClient(options);
  await waitRedisConnection(logClient);
}

function waitRedisConnection(client: RedisClient): Promise<void> {
  return new Promise(async (resolve, reject) => {
    client.on('error', (error) => {
      console.error(error);
      reject();
    });

    client.on('ready', () => {
      resolve();
    });
  });
}

export function pushListLog(list: string, value: any): void {
  pushListRedis(logClient, list, value);
}

export function pushListRedis(client: RedisClient, list: string, value: any): void {
  const string = JSON.stringify(value);
  client.rpush(list, string);
}

export async function getRangeListLog(list: string, start = 0, stop = 100): Promise<any> {
  return await getRangeListRedis(logClient, list, start, stop);
}

export function getRangeListRedis(client: RedisClient, list: string, start = 0, stop = 100): Promise<any> {
  return new Promise((resolve, reject) => {
    client.lrange(list, start, stop, (error, response) => {
      if (error) {
        return reject(error);
      }

      resolve(response);
    });
  });
}

export function trimListLog(list: string, start = 0, stop = -1): void {
  trimListRedis(logClient, list, start, stop);
}

export function trimListRedis(client: RedisClient, list: string, start = 0, stop = -1): void {
  client.ltrim(list, start, stop);
}
