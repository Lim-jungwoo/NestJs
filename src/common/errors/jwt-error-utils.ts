import { HttpStatus } from '@nestjs/common';
import { JwtException } from '../exceptions/jwt-exception';
import { JWT_ERROR_CODES } from './jwt-error-codes';

export function handleJwtError(error: any): void {
  //todo 로그
  // console.error(error);
  if (error.name === JWT_ERROR_CODES.TOKEN_EXPIRED.name) {
    throw new JwtException(
      JWT_ERROR_CODES.TOKEN_EXPIRED.code,
      HttpStatus.UNAUTHORIZED,
    );
  } else if (error.name === JWT_ERROR_CODES.INVALID_TOKEN.name) {
    throw new JwtException(
      JWT_ERROR_CODES.INVALID_TOKEN.code,
      HttpStatus.UNAUTHORIZED,
    );
  } else if (error.name === JWT_ERROR_CODES.TOKEN_NOT_ACTIVE_YET.name) {
    throw new JwtException(
      JWT_ERROR_CODES.TOKEN_NOT_ACTIVE_YET.code,
      HttpStatus.UNAUTHORIZED,
    );
  } else {
    throw new JwtException(
      JWT_ERROR_CODES.VERIFICATION_FAILED.code,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
