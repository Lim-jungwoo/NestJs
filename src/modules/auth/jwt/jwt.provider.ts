import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as fs from 'fs';
import { AccessTokenPayload } from './interfaces/access-token-payload.interface';
import { RefreshTokenPayload } from './interfaces/refresh-token-payload.interface';
import { resolvePathSafe } from 'src/common/utils/path.util';
import { TypedConfigService } from 'src/config/typed-config.service';

@Injectable()
export class JwtProvider {
  private readonly accessJwt: JwtService;
  private readonly refreshJwt: JwtService;

  constructor(private readonly configService: TypedConfigService) {
    this.accessJwt = new JwtService({
      privateKey: fs.readFileSync(
        resolvePathSafe(this.configService.get('JWT_ACCESS_PRIVATE_KEY_PATH')),
      ),
      publicKey: fs.readFileSync(
        resolvePathSafe(this.configService.get('JWT_ACCESS_PUBLIC_KEY_PATH')),
      ),
      signOptions: {
        algorithm: this.configService.get('JWT_ACCESS_ALGORITHM'),
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRE'),
      },
    });

    this.refreshJwt = new JwtService({
      privateKey: fs.readFileSync(
        resolvePathSafe(this.configService.get('JWT_REFRESH_PRIVATE_KEY_PATH')),
      ),
      publicKey: fs.readFileSync(
        resolvePathSafe(this.configService.get('JWT_REFRESH_PUBLIC_KEY_PATH')),
      ),
      signOptions: {
        algorithm: this.configService.get('JWT_REFRESH_ALGORITHM'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRE'),
      },
    });
  }

  generateAccessToken(payload: AccessTokenPayload): string {
    return this.accessJwt.sign(payload);
  }

  generateRefreshToken(payload: RefreshTokenPayload): string {
    return this.refreshJwt.sign(payload);
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    return this.accessJwt.verify(token);
  }

  verifyRefreshToken(token: string): RefreshTokenPayload {
    return this.refreshJwt.verify(token);
  }

  decodeAccessToken(token: string): AccessTokenPayload {
    return this.accessJwt.decode(token);
  }

  decodeRefreshToken(token: string): RefreshTokenPayload {
    return this.refreshJwt.decode(token);
  }
}
