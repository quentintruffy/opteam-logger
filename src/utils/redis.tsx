'use server';

import { LogArraySchema, LogArrayType } from '@/schemas';
import { redis } from './import';

export const getAllLogs = async (): Promise<LogArrayType | null> => {
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
