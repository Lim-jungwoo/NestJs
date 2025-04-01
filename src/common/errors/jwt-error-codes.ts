export const JWT_ERROR_CODES = {
  TOKEN_MISSING: {
    messages: {
      en: 'Token is missing.',
      ko: '토큰이 없습니다.',
    },
    code: 'TOKEN_MISSING',
  },
  TOKEN_EXPIRED: {
    messages: {
      en: 'Token has expired',
      ko: '토큰이 만료되었습니다.',
    },
    code: 'TOKEN_EXPIRED',
    name: 'TokenExpiredError',
  },
  INVALID_TOKEN: {
    messages: {
      en: 'Invalid token',
      ko: '유효하지 않은 토큰입니다.',
    },
    code: 'INVALID_TOKEN',
    name: 'JsonWebTokenError',
  },
  INVALID_TOKEN_FORMAT: {
    messages: {
      en: 'Invalid token format',
      ko: '유효하지 않은 토큰 형식입니다.',
    },
    code: 'INVALID_TOKEN_FORMAT',
  },
  TOKEN_NOT_ACTIVE_YET: {
    messages: {
      en: 'Token is not active yet.',
      ko: '토큰이 아직 활성화되지 않았습니다.',
    },
    code: 'TOKEN_NOT_ACTIVE_YET',
    name: 'NotBeforeError',
  },
  VERIFICATION_FAILED: {
    messages: {
      en: 'Token verification failed',
      ko: '토큰 검증 실패',
    },
    code: 'VERIFICATION_FAILED',
    name: 'Error', // 일반적인 에러로 처리
  },
  AUTHENTICATION_SYSTEM_ERROR: {
    messages: {
      en: 'Authentication system error',
      ko: '인가 실패',
    },
    code: 'AUTHENTICATION_SYSTEM_ERROR',
    name: 'AuthenticationSystemError',
  },
};
