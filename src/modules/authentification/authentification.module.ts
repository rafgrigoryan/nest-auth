import { Module } from '@nestjs/common';
import { AuthService } from './authentification.service';
import { AuthController } from './authentification.controller';
import { UserSchema } from 'src/database/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BcryptService } from 'src/common/utils/bcrypt.util';
import { JwtService } from '@nestjs/jwt';
import { EmailModule } from '../mailer/mailer.module';
import { TokensService } from './tokens.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    EmailModule,
  ],
  providers: [AuthService, BcryptService, JwtService, TokensService],
  controllers: [AuthController],
})
export class AuthentificationModule {}
