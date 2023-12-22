import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenTypes } from 'src/common/enums/sign.enum';
import { ConfigService } from '@nestjs/config';
import { RoleTypes } from 'src/common/interfaces/sign.interfaces';

@Injectable()
export class TokensService {
  private readonly jwtSecret: string;
  private readonly jwtAccTTL: number;
  private readonly jwtRefTTl: number;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get('jwt.secret');
    this.jwtAccTTL = this.configService.get('jwt.accessTokenTtl');
    this.jwtRefTTl = this.configService.get('jwt.refreshTokenTtl');
  }

  async generateTokens(userId: string, role: RoleTypes) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: userId,
          type: TokenTypes.access,
          role,
        },
        { secret: this.jwtSecret, expiresIn: this.jwtAccTTL + 'h' },
      ),
      refreshToken: this.jwtService.sign(
        {
          id: userId,
          type: TokenTypes.refresh,
          role,
        },
        { secret: this.jwtSecret, expiresIn: this.jwtRefTTl + 'd' },
      ),
    };
  }
}
