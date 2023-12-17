import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ResetPasswordVerifyDto {
  @ApiProperty({
    description: 'Email of user',
    example: 'atest@email.com',
  })
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  readonly email: string;
}

export class ResetPasswordConfirmPinDto {
  @ApiProperty({
    description: 'Email of user',
    example: 'atest@email.com',
  })
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: '6986',
    description: 'Pin code received by email.',
  })
  @IsNumberString()
  @MaxLength(4, { message: 'Pin should be 4 digits' })
  @IsNotEmpty()
  readonly pin: string;
}

export class ResetChangePasswordDto {
  @ApiProperty({
    description: 'Email of user',
    example: 'atest@email.com',
  })
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'Token',
    example: 'e7482a864e11272f7204ae87',
  })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  readonly token: string;

  @ApiProperty({
    description: 'New Password',
    example: 'Pass#123',
  })
  @MinLength(8, {
    message: 'password too short',
  })
  @MaxLength(20, {
    message: 'password too long',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @IsNotEmpty()
  readonly password: string;
}
