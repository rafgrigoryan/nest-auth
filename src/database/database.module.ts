import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const db = configService.get('database');
        return {
          uri: `mongodb+srv://${db.username}:${db.password}@cluster0.rknelzj.mongodb.net/?retryWrites=true&w=majority`, // Use the retrieved values
        };
      },
    }),
  ],
})
export class DatabaseModule {}
