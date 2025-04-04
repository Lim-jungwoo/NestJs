export const LOGIN_ERROR_CODES = {
  USER_ID_ALREADY_EXISTS: {
    messages: {
      en: 'Id is already exists',
      ko: '해당 아이디가 이미 존재합니다.',
    },
    code: 'USER_ID_ALREADY_EXISTS',
  },
  USER_EMAIL_ALREADY_EXISTS: {
    messages: {
      en: 'Email is already exists',
      ko: '해당 이메일이 이미 존재합니다.',
    },
    code: 'USER_EMAIL_ALREADY_EXISTS',
  },
  INVALID_PASSWORD: {
    messages: {
      en: 'Password is invalid',
      ko: '비밀번호가 일치하지 않습니다.',
    },
    code: 'INVALID_PASSWORD',
  },
  USER_ID_NOT_FOUND: {
    messages: {
      en: "Id doesn't exist",
      ko: '아이디가 존재하지 않습니다.',
    },
    code: 'USER_ID_NOT_FOUND',
  },
};
