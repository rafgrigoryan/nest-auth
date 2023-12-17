import { registerAs } from '@nestjs/config';

export default registerAs('mailer', () => {
  return {
    email: process.env.MAILER_USERNAME,
    password: process.env.MAILER_PASSWORD,
  };
});
