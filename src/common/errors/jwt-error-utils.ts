import { HttpStatus } from '@nestjs/common';
import { JWT_ERROR_CODES } from './jwt-error-codes';
import { CustomException } from '../exceptions/custom-exception';

export function handleJwtError(error: any): void {
  //todo 로그
  // console.error(error);
  if (error.name === JWT_ERROR_CODES.TOKEN_EXPIRED.name) {
    throw new CustomException(
      JWT_ERROR_CODES.TOKEN_EXPIRED.code,
      HttpStatus.UNAUTHORIZED,
    );
  } else if (error.name === JWT_ERROR_CODES.INVALID_TOKEN.name) {
    throw new CustomException(
      JWT_ERROR_CODES.INVALID_TOKEN.code,
      HttpStatus.UNAUTHORIZED,
    );
  } else if (error.name === JWT_ERROR_CODES.TOKEN_NOT_ACTIVE_YET.name) {
    throw new CustomException(
      JWT_ERROR_CODES.TOKEN_NOT_ACTIVE_YET.code,
      HttpStatus.UNAUTHORIZED,
    );
  } else {
    throw new CustomException(
      JWT_ERROR_CODES.VERIFICATION_FAILED.code,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
