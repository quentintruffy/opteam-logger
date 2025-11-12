import { LogArraySchema, LogArrayType } from '@/schemas';
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || '192.168.1.23',
  port: Number(process.env.REDIS_PORT) || 6379,
  db: Number(process.env.REDIS_DB) || 1,
});

const getAllLogs = async (): Promise<LogArrayType | null> => {
  try {
    const keys = await redis.keys('*');

    if (keys.length === 0) {
      return [];
    }

    const values = await redis.mget(...keys);

    const logs = values
      .map(value => {
        if (!value) return null;
        try {
          return JSON.parse(value);
        } catch (error) {
          console.error(`Erreur parsing JSON:`, error);
          return null;
        }
      })
      .filter(log => log !== null);

    const parsedLogs = await LogArraySchema.safeParseAsync(logs);
    if (!parsedLogs.success) {
      console.error(parsedLogs.error);
      return null;
    }
    console.log(parsedLogs);
    return parsedLogs.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { getAllLogs, redis };
