import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  return {
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
  };
});
