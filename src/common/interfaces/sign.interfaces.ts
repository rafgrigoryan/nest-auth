type CacheTargets = 'registration' | 'forgotPassword';

export interface ICacheObject {
  pin?: number;
  password?: string;
  name?: string;
  token?: string;
  target: CacheTargets;
}
