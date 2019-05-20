import { Query } from 'mongoose';
import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || '';
const client = new Redis(redisUrl);

const { exec } = Query.prototype;

//ts-node ignores my mongoose declaration file, so im using js file instead until i fix the issue

Query.prototype.cache = function cache(options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || '');
  return this;
};

Query.prototype.exec = async function overrideExec(...params) {
  if (!this.useCache) return exec.apply(this, params);
  const key = JSON.stringify({
    ...this.getQuery(),

    collection: this.mongooseCollection.name,
  });
  try {
    // see if we have value for 'key' in redis

    const cacheValue = await client.hget(this.hashKey, key);
    // if we do, return the value
    if (cacheValue) {
      const cacheObject = JSON.parse(cacheValue);
      return Array.isArray(cacheObject)
        ? cacheObject.map(doc => new this.model(doc))
        : new this.model(cacheObject);
    }
    // otherwise, issue the query and store the result in redis

    const result = await exec.apply(this, params);

    client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 10);
    return result;
  } catch (error) {
    return error;
  }
};

export default {
  clearCache(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
};
