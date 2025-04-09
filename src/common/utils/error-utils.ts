import { LANGUAGES } from 'src/constants/lang-constants';
import { ERROR_CODES } from '../../constants/errors/error-codes';
import { JWT_ERROR_CODES } from '../../constants/errors/jwt-error-codes';
import { LOGIN_ERROR_CODES } from '../../constants/errors/login-error-codes';

const ERROR_CODES_MAP = new Map([
  ...Object.entries(ERROR_CODES),
  ...Object.entries(JWT_ERROR_CODES),
  ...Object.entries(LOGIN_ERROR_CODES),
]);

export function getErrorMessage(
  key: string,
  lang: (typeof LANGUAGES)[keyof typeof LANGUAGES] = LANGUAGES.KO,
) {
  const error = ERROR_CODES_MAP.get(key);
  return (
    error?.messages[lang] ||
    error?.messages[LANGUAGES.EN] ||
    ERROR_CODES.UNKNOWN_ERROR.messages.en
  );
}
