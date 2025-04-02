import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { JWT_ERROR_CODES } from 'src/common/errors/jwt-error-codes';
import { handleJwtError } from 'src/common/errors/jwt-error-utils';
import { CustomException } from 'src/common/exceptions/custom-exception';

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    super();
  }

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
      throw new CustomException(
        JWT_ERROR_CODES.AUTHENTICATION_SYSTEM_ERROR.code,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!user) {
      console.warn(
        JWT_ERROR_CODES.VERIFICATION_FAILED.messages.ko,
        info?.message,
      );
      throw new CustomException(
        info?.message || JWT_ERROR_CODES.VERIFICATION_FAILED.code,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}
