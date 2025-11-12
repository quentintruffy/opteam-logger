import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || '192.168.1.23',
  port: Number(process.env.REDIS_PORT) || 6379,
  db: Number(process.env.REDIS_DB) || 1,
});

export { redis };
