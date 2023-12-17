import {
  ConflictException,
  NotFoundException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import * as crypto from 'crypto';

import { Model } from 'mongoose';
import { SignUpDataDto, SignUpPinDto } from './dto/sign-up.dto';
import { RedisService } from 'src/modules/redis/redis.service';
import { IUserSchema } from 'src/common/interfaces/schemas.interface';
import { ICacheObject } from 'src/common/interfaces/sign.interfaces';
import {
  IReturnData,
  ISignServiceReturnData,
} from 'src/common/interfaces/returnData.interface';
import { generateResponse } from 'src/common/utils/global.util';
import { BcryptService } from 'src/common/utils/bcrypt.util';
import { EmailService } from '../mailer/mailer.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignTargets } from 'src/common/enums/sign-targets.enum';
import {
  ResetChangePasswordDto,
  ResetPasswordConfirmPinDto,
  ResetPasswordVerifyDto,
} from './dto/reset-password';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;
  private readonly jwtAccTTL: number;
  private readonly jwtRefTTl: number;
  constructor(
    @InjectModel('user') private userModel: Model<IUserSchema>,
    private readonly redis: RedisService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {
    this.jwtSecret = this.configService.get('jwt.secret');
    this.jwtAccTTL = this.configService.get('jwt.accessTokenTtl');
    this.jwtRefTTl = this.configService.get('jwt.refreshTokenTtl');
  }

  async signUpData(data: SignUpDataDto): Promise<IReturnData> {
    try {
      const { name, email, password } = data;
      const emailExists = await this.userModel.findOne({ email }).exec();
      if (emailExists)
        throw new ConflictException('User with this email already exists');
      const pin = Math.floor(1000 + Math.random() * 9000);
      const cacheObject: ICacheObject = {
        pin,
        name,
        password,
        target: SignTargets.registration,
      };
      this.redis.insert(email, JSON.stringify(cacheObject), 3600);
      await this.emailService.sendRegEmail(name, email, pin);
      return generateResponse('Pin Sent to Email !');
    } catch (error) {
      throw error;
    }
  }

  async signUpVerify(pinData: SignUpPinDto): Promise<IReturnData> {
    const { pin, email } = pinData;

    try {
      const cachedData: ICacheObject = await this.redis.get(email);

      if (!cachedData) throw new NotFoundException('Expired Request !');
      if (+pin !== cachedData.pin) throw new BadRequestException('Wrong Pin !');
      if (cachedData.target !== SignTargets.registration)
        throw new BadRequestException('Not Allowed !');
      await this.redis.delete(email);

      const user = await new this.userModel({
        name: cachedData.name,
        email,
        password: await this.bcryptService.hash(cachedData.password),
      }).save();

      const accessToken = this.jwtService.sign(
        { id: user._id },
        { secret: this.jwtSecret, expiresIn: this.jwtAccTTL + 'h' },
      );
      const refreshToken = this.jwtService.sign(
        { id: user._id },
        { secret: this.jwtSecret, expiresIn: this.jwtRefTTl + 'd' },
      );

      const responseData: ISignServiceReturnData = {
        id: user._id,
        name: user.name,
        email: user.email,
        accessToken,
        refreshToken,
      };
      return generateResponse('User created successfully !', responseData);
    } catch (error) {
      throw error;
    }
  }

  async signIn(signInData: SignInDto): Promise<IReturnData> {
    try {
      const { email, password } = signInData;
      const user = await this.userModel.findOne({ email });
      if (!user) throw new BadRequestException('Invalid email');

      const isPasswordMatch = await this.bcryptService.compare(
        password,
        user.password,
      );
      if (!isPasswordMatch) throw new BadRequestException('Invalid password');
      const accessToken = this.jwtService.sign(
        { id: user._id },
        { secret: this.jwtSecret, expiresIn: this.jwtAccTTL + 'h' },
      );
      const refreshToken = this.jwtService.sign(
        { id: user._id },
        { secret: this.jwtSecret, expiresIn: this.jwtRefTTl + 'd' },
      );

      const responseData: ISignServiceReturnData = {
        id: user._id,
        name: user.name,
        email: user.email,
        accessToken,
        refreshToken,
      };

      return generateResponse('User created successfully !', responseData);
    } catch (error) {
      throw error;
    }
  }

  async resetPasswordVerify(
    resetData: ResetPasswordVerifyDto,
  ): Promise<IReturnData> {
    try {
      const { email } = resetData;
      const emailExists = await this.userModel.findOne({ email }).exec();
      if (!emailExists)
        throw new BadRequestException('User with such email does not exist');
      const pin = Math.floor(1000 + Math.random() * 9000);
      const cacheObject: ICacheObject = {
        pin,
        target: SignTargets.forgotPassword,
      };
      this.redis.insert(email, JSON.stringify(cacheObject), 3600);
      await this.emailService.sendResetEmail(email, pin);
      return generateResponse('Pin Sent to Email !');
    } catch (error) {
      throw error;
    }
  }

  async resetPasswordConfirmPin(
    resetPinConfirmData: ResetPasswordConfirmPinDto,
  ): Promise<IReturnData> {
    try {
      const { email, pin } = resetPinConfirmData;
      const cachedData: ICacheObject = await this.redis.get(email);
      if (+pin !== cachedData.pin) throw new BadRequestException('Wrong Pin !');
      if (cachedData.target !== SignTargets.forgotPassword)
        throw new BadRequestException('Not Allowed !');
      const token = crypto.randomBytes(12).toString('hex');
      const cacheObject: ICacheObject = {
        token,
        target: SignTargets.forgotPassword,
      };
      this.redis.insert(email, JSON.stringify(cacheObject), 3600);
      return generateResponse('Ready to insert new password !', {
        email,
        token,
      });
    } catch (error) {
      throw error;
    }
  }

  async resetChangePassword(
    resetChangePasswordData: ResetChangePasswordDto,
  ): Promise<IReturnData> {
    try {
      const { email, token, password } = resetChangePasswordData;
      const cachedData: ICacheObject = await this.redis.get(email);
      if (token !== cachedData.token)
        throw new BadRequestException('Wrong Token !');
      await this.userModel.findOneAndUpdate(
        { email: email },
        { password: await this.bcryptService.hash(password) },
        { new: true },
      );
      await this.redis.delete(email);
      return generateResponse('Password changed successfully !');
    } catch (error) {
      throw error;
    }
  }
}
