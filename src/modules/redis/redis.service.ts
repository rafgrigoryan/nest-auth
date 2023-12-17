import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

import { IORedisKey } from './redis.constants';

@Injectable()
export class RedisService {
  constructor(
    @Inject(IORedisKey)
    private readonly redisClient: Redis,
  ) {}

  async getKeys(pattern?: string): Promise<string[]> {
    return await this.redisClient.keys(pattern);
  }

  async insert(
    key: string,
    value: string | number,
    ttlInSeconds: number,
  ): Promise<void> {
    await this.redisClient.set(key, value);
    await this.redisClient.expire(key, ttlInSeconds);
  }

  async get(key: string): Promise<any> {
    const cachedData = await this.redisClient.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
  }

  async delete(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async validate(key: string, value: string): Promise<boolean> {
    const storedValue = await this.redisClient.get(key);
    return storedValue === value;
  }
}
