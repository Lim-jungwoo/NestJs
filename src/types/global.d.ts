declare global {
  namespace Express {
    interface Request {
      user?: any; // 필요 시 유저 타입으로 교체 e.g., UserEntity
    }
  }
}

export {};
