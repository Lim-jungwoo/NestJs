# 📘 서비스 계층 패턴 가이드라인 (NestJS + DDD 스타일)

## 🧱 네이밍 패턴

| Prefix         | 목적                  | 동작                       | 반환                  |
| -------------- | --------------------- | -------------------------- | --------------------- |
| `findOneByX()` | 객체 1개 조회         | 없으면 `null`              | `User \| null`        |
| `getOneByX()`  | 객체 1개 조회         | 없으면 **예외 발생**       | `User`                |
| `findAllByX()` | 조건으로 여러 개 조회 | 배열 반환                  | `User[]`              |
| `create()`     | 새 객체 생성          | 유효성 검사 포함           | 생성된 객체           |
| `update()`     | 상태 변경             | 없으면 예외 또는 실패 처리 | 변경된 객체           |
| `delete()`     | 객체 제거             | 논리/물리 삭제 모두 가능   | void 또는 삭제된 객체 |
| `countByX()`   | 개수 조회             | 조건 기반 카운트           | `number`              |
| `existsByX()`  | 존재 여부 확인        | 불리언 반환                | `boolean`             |

---

## 💡 네이밍 선택 기준

| 상황                                     | 사용 함수              |
| ---------------------------------------- | ---------------------- |
| 유저가 존재하지 않으면 로그인 실패 처리  | `getOneByEmail()`      |
| 관리자 페이지에서 검색, 없으면 빈 리스트 | `findAllByCondition()` |
| 특정 조건 만족하는지 검사만              | `existsByEmail()`      |
| 유저 삭제                                | `deleteById()`         |
| 조건에 따라 여러 유저 조회               | `findAllByRole()`      |

---

## 🎯 예외 처리 기준

### `findOneByX()`

- 유저가 없을 수 있음 → `null` 반환
- 호출하는 쪽에서 처리

```ts
const user = await this.userService.findOneByEmail(email);
if (!user)
  throw new CustomException(
    LOGIN_ERROR_CODES.USER_EMAIL_NOT_FOUND.code,
    HttpStatus.NOT_FOUND,
  );
```

### `getOneByX()`

- 없으면 바로 예외 발생 (서비스 내부에서 처리)

```ts
async getOneByEmail(email: string): Promise<User> {
  const user = await this.findOneByEmail(email);
  if (!user) throw new CustomException(
        LOGIN_ERROR_CODES.USER_EMAIL_NOT_FOUND.code,
        HttpStatus.NOT_FOUND,
      );
  return user;
}
```

---

## ✨ 응용 패턴

| 메서드     | 용도                                      |
| ---------- | ----------------------------------------- |
| `upsert()` | 존재하면 업데이트, 없으면 생성            |
| `apply()`  | 상태 변화 (ex: 쿠폰 적용, 포인트 차감 등) |
| `verify()` | 검증 전용 로직 → boolean 또는 예외 던짐   |

---

## 🧩 서비스 계층 구성 예시

```ts
// user.service.ts

async create(dto: CreateUserDto): Promise<User> { ... }

async findOneByEmail(email: string): Promise<User | null> { ... }

async getOneByEmail(email: string): Promise<User> { ... }

async updateNickname(id: number, nickname: string): Promise<User> { ... }

async deleteById(id: number): Promise<void> { ... }

async existsByEmail(email: string): Promise<boolean> { ... }
```

---

## 🧠 보너스: 네이밍은 "무엇을 기대하는가"를 드러내는 도구

```ts
await getOneByEmail('abc@example.com') // 예외 날 수도 있겠다
await findOneByEmail('abc@example.com') // null 체크해야겠다
await updateNickname(...) // 뭔가 바뀌는 액션이겠네
await existsByEmail(...) // boolean이겠지?
```

→ **함수만 보고도 동작을 예측할 수 있는 구조 = 좋은 네이밍**

---

## ✅ 요약

- `find` → 존재할 수도 없을 수도
- `get` → 없으면 예외
- `update`, `delete`, `create` → 상태 변형
- `exists`, `count` → 체크/통계용
- 명확하고 일관된 네이밍이 유지보수성과 확장성을 높여줌
