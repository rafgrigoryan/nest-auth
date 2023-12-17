import { ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

export const getMailConfig = async (
  configService: ConfigService,
): Promise<any> => {
  const transport = {
    host: 'smtp.gmail.com',
    port: 465,
    ignoreTLS: true,
    secure: true,
    auth: {
      user: configService.get<string>('mailer.email'),
      pass: configService.get<string>('mailer.password'),
    },
  };

  const mailFromName = configService.get<string>('mailer.email');

  return {
    transport,
    defaults: {
      from: `<${mailFromName}>`,
    },
    template: {
      dir: __dirname + '/templates',
      adapter: new EjsAdapter(),
      options: {
        strict: false,
      },
    },
  };
};
