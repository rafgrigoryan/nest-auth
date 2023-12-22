type CacheTargets = 'registration' | 'forgotPassword';
export type RoleTypes = 'user' | 'superhero' | 'admin';

export interface ICacheObject {
  pin?: number;
  password?: string;
  name?: string;
  token?: string;
  target: CacheTargets;
}
