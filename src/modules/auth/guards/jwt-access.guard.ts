import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { JwtException } from 'src/common/exceptions/jwt-exception';
import { JWT_ERROR_CODES } from 'src/common/errors/jwt-error-codes';
import { handleJwtError } from 'src/common/errors/jwt-error-utils';
import { GeneralException } from 'src/common/exceptions/general-exception';
import { ERROR_CODES } from 'src/common/errors/error-codes';

@Injectable()
export class JwtAccessAuthGuard extends AuthGuard('jwt-access') {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    super();
  }

  // todo canActivate, validate, handleRequest 비동기/동기 작동 방식 이해
  canActivate(context: ExecutionContext) {
    const activate = super.canActivate(context);
    return activate;
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    _context: ExecutionContext,
    _status?: any,
  ): TUser {
    if (info) handleJwtError(info);
    if (err) {
      console.error(
        JWT_ERROR_CODES.AUTHENTICATION_SYSTEM_ERROR.messages.ko,
        err,
      );
      throw new JwtException(
        JWT_ERROR_CODES.AUTHENTICATION_SYSTEM_ERROR.code,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!user) {
      console.warn(
        JWT_ERROR_CODES.VERIFICATION_FAILED.messages.ko,
        info?.message,
      );
      throw new JwtException(
        info?.message || JWT_ERROR_CODES.VERIFICATION_FAILED.code,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}
