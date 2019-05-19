namespace Mongoose {
  interface Query<T> {
    cache(options: CacheOptions): Query<T>;
    useCache: boolean;
    hashKey: string;
  }
}
type CacheOptions = {
  key?: string;
};
