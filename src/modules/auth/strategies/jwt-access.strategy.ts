import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayload } from '../jwt/interfaces/access-token-payload.interface';
import * as fs from 'fs';
import { resolvePathSafe } from 'src/common/utils/path.util';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      ignoreExpiration: false,
      secretOrKey: fs.readFileSync(
        resolvePathSafe(
          configService.get<string>('JWT_ACCESS_PUBLIC_KEY_PATH'),
        ),
      ),
      algorithms: [configService.get<string>('JWT_ACCESS_ALGORITHM')],
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
    });
  }

  /**
   * @description 사용자 인증에 성공한 경우 payload에 JWT 토큰에서 추출한 데이터가 전달된다.
   * @param req Request
   * @param payload JWT 유저 정보
   * @returns 반환된 값은 Request에 속성으로 추가된다. 객체를 꼭 반환해야 JWT 검증에 성공한다.
   */
  validate(req, payload: AccessTokenPayload) {
    return payload;
  }
}
