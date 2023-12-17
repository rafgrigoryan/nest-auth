import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDataDto {
  @ApiProperty({
    description: 'Name of user',
    example: 'John Doe',
  })
  @MaxLength(50, { message: 'Name too long' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 'atest@email.com',
    description: 'Email of user',
  })
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'Password of user',
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

export class SignUpPinDto {
  @ApiProperty({
    example: '6986',
    description: 'Pin code received by email.',
  })
  @IsNumberString()
  @MaxLength(4, { message: 'Pin should be 4 digits' })
  @IsNotEmpty()
  readonly pin: string;

  @ApiProperty({
    example: 'atest@email.com',
    description: 'Email of user',
  })
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  readonly email: string;
}
