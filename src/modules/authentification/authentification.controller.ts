import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './authentification.service';
import { SignUpDataDto, SignUpPinDto } from './dto/sign-up.dto';
import { IReturnData } from 'src/common/interfaces/returnData.interface';
import { SignInDto } from './dto/sign-in.dto';
import {
  ResetChangePasswordDto,
  ResetPasswordConfirmPinDto,
  ResetPasswordVerifyDto,
} from './dto/reset-password';

@ApiTags('Sign Up/In, Reset Password')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up send verification' })
  @ApiConflictResponse({
    description: 'User already exists',
  })
  @ApiCreatedResponse({ description: 'Pin Sent To Email !' })
  @Post('sing-up/data')
  async signUpData(
    @Body(ValidationPipe) body: SignUpDataDto,
  ): Promise<IReturnData> {
    return await this.authService.signUpData(body);
  }

  @ApiOperation({ summary: 'Sign up verify user' })
  @ApiNotFoundResponse({ description: 'Pin is Expired' })
  @ApiBadRequestResponse({ description: 'Wrong pin' })
  @ApiCreatedResponse({ description: 'User Created !' })
  @Post('sing-up/verify')
  async signUpVerify(
    @Body(ValidationPipe) body: SignUpPinDto,
  ): Promise<IReturnData> {
    return await this.authService.signUpVerify(body);
  }

  @ApiOperation({ summary: 'Sign In' })
  @ApiBadRequestResponse({ description: 'Invalid Email or Password' })
  @ApiCreatedResponse({ description: 'Logged in successfully !' })
  @Post('sign-in')
  async signIn(@Body(ValidationPipe) body: SignInDto): Promise<IReturnData> {
    return await this.authService.signIn(body);
  }

  @ApiOperation({ summary: 'Reset password send pin to email' })
  @ApiBadRequestResponse({ description: 'Wrong data sent' })
  @ApiCreatedResponse({ description: 'Pin Sent To Email !' })
  @Post('reset-password/verify')
  async resetPasswordVerify(
    @Body(ValidationPipe) body: ResetPasswordVerifyDto,
  ): Promise<IReturnData> {
    return await this.authService.resetPasswordVerify(body);
  }

  @ApiOperation({ summary: 'Reset password confirm pin and generate token' })
  @ApiBadRequestResponse({ description: 'Wrong data sent' })
  @ApiCreatedResponse({ description: 'Token recieved !' })
  @Post('reset-password/confirm')
  async resetPasswordConfirmPin(
    @Body(ValidationPipe) body: ResetPasswordConfirmPinDto,
  ): Promise<IReturnData> {
    return await this.authService.resetPasswordConfirmPin(body);
  }

  @ApiOperation({ summary: 'Change Password with reset token' })
  @ApiBadRequestResponse({ description: 'Wrong data sent' })
  @ApiCreatedResponse({ description: 'Password Changed !' })
  @Post('reset-password/change')
  async resetPasswordChange(
    @Body(ValidationPipe) body: ResetChangePasswordDto,
  ): Promise<IReturnData> {
    return await this.authService.resetChangePassword(body);
  }
}
