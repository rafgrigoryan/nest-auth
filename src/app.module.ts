import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from './common/config/app.config';
import databaseConfig from './common/config/database.config';
import jwtConfig from './common/config/jwt.config';
import mailerConfig from './common/config/mailer.config';
import { validate } from './common/validation/env.validation';
import { DatabaseModule } from './database/database.module';
import redisConfig from './common/config/redis.config';
import { RedisModule } from './modules/redis/redis.module';
import swaggerConfig from './common/config/swagger.config';
import { AuthentificationModule } from './modules/authentification/authentification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [
        appConfig,
        jwtConfig,
        databaseConfig,
        redisConfig,
        swaggerConfig,
        mailerConfig,
      ],
      validate,
    }),
    DatabaseModule,
    RedisModule,
    AuthentificationModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule {}
