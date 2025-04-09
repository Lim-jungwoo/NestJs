import { HttpException, HttpStatus } from '@nestjs/common';
import { LANGUAGES } from 'src/constants/lang-constants';
import { getErrorMessage } from '../utils/error-utils';

export class CustomException extends HttpException {
  constructor(
    key: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    lang: (typeof LANGUAGES)[keyof typeof LANGUAGES] = LANGUAGES.KO,
  ) {
    super(getErrorMessage(key, lang), status);
  }
}
