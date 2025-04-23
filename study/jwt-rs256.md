# 🔐 RS256 기반 JWT 인증 구조

이 문서는 NestJS에서 RS256 알고리즘을 사용해 **accessToken / refreshToken**을 발급하고 검증하는 구조를 설명합니다.

---

## 📦 키 생성

```bash
# 개인 키 (서명용)
openssl genpkey -algorithm RSA -out private-access.pem -pkeyopt rsa_keygen_bits:2048
openssl genpkey -algorithm RSA -out private-refresh.pem -pkeyopt rsa_keygen_bits:2048

# 공개 키 (검증용)
openssl rsa -pubout -in private-access.pem -out public-access.pem
openssl rsa -pubout -in private-refresh.pem -out public-refresh.pem
```

### 📁 결과 파일

| 키 종류     | accessToken          | refreshToken          |
| ----------- | -------------------- | --------------------- |
| private key | `private-access.pem` | `private-refresh.pem` |
| public key  | `public-access.pem`  | `public-refresh.pem`  |

---

## 🧪 .env 예시

```env
JWT_ACCESS_PRIVATE_KEY_PATH=keys/private-access.pem
JWT_ACCESS_PUBLIC_KEY_PATH=keys/public-access.pem
JWT_ACCESS_EXPIRE=15m

JWT_REFRESH_PRIVATE_KEY_PATH=keys/private-refresh.pem
JWT_REFRESH_PUBLIC_KEY_PATH=keys/public-refresh.pem
JWT_REFRESH_EXPIRE=7d
```

---

## 🧩 JwtProvider 예시 (access/refresh 통합 관리)

```ts
// src/modules/auth/jwt/jwt.provider.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Injectable()
export class JwtProvider {
  private readonly accessJwt: JwtService;
  private readonly refreshJwt: JwtService;

  constructor(private readonly config: ConfigService) {
    this.accessJwt = new JwtService({
      privateKey: fs.readFileSync(config.get('JWT_ACCESS_PRIVATE_KEY_PATH')),
      publicKey: fs.readFileSync(config.get('JWT_ACCESS_PUBLIC_KEY_PATH')),
      signOptions: {
        algorithm: 'RS256',
        expiresIn: config.get('JWT_ACCESS_EXPIRE'),
      },
    });

    this.refreshJwt = new JwtService({
      privateKey: fs.readFileSync(config.get('JWT_REFRESH_PRIVATE_KEY_PATH')),
      publicKey: fs.readFileSync(config.get('JWT_REFRESH_PUBLIC_KEY_PATH')),
      signOptions: {
        algorithm: 'RS256',
        expiresIn: config.get('JWT_REFRESH_EXPIRE'),
      },
    });
  }

  generateAccessToken(payload: any): string {
    return this.accessJwt.sign(payload);
  }

  generateRefreshToken(payload: any): string {
    return this.refreshJwt.sign(payload);
  }

  verifyAccessToken(token: string): any {
    return this.accessJwt.verify(token);
  }

  verifyRefreshToken(token: string): any {
    return this.refreshJwt.verify(token);
  }
}
```

---

## 🔐 Strategy 예시 (Access)

```ts
super({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  publicKey: fs.readFileSync(config.get('JWT_ACCESS_PUBLIC_KEY_PATH')),
  algorithms: ['RS256'],
  ignoreExpiration: false,
});
```

---

## 🧾 JWT 구조 설계

| 항목     | accessToken        | refreshToken        |
| -------- | ------------------ | ------------------- |
| 서명 키  | private-access.pem | private-refresh.pem |
| 검증 키  | public-access.pem  | public-refresh.pem  |
| 만료시간 | 15분               | 7일                 |
| 알고리즘 | RS256              | RS256               |

---

## 🔐 보안 주의사항

- 🔒 `private-*.pem` 파일은 절대 Git에 올리면 안 됨
- 🔒 키 파일은 `.gitignore`에 반드시 포함
- ✅ 경로는 `.env`를 통해 관리하고, 코드에서 `ConfigService.get()`으로 읽기

---

## ✅ 기타 팁

- public 키는 여러 서버에 공유 가능 (검증만 가능)
- 토큰 위조 방지에 강함 (비대칭 구조)
- refreshToken은 Redis 등으로 블랙리스트 처리도 고려 가능
