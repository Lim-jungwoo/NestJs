# 🧩 NestJS 프로젝트 가이드라인

이 프로젝트는 **NestJS를 학습하고 실무 스타일로 적용해보기 위해 구성된 서버 개발 연습용 프로젝트**입니다.
개발과정에서의 일관된 구조, 커밋 규칙, 서비스 계층 구성 등 실무에서 필요한 요소들을 직접 익히고 적용해볼 수 있도록 구성되어 있습니다.

---

## 🧱 프로젝트 구조

```
src/
├── common/            # 예외 필터, 유틸 등
├── constants/         # 상수 정의 (에러 코드, 메시지 등)
├── database/          # DB 설정, 데이터소스 정의
│   └── migrations/    # TypeORM 마이그레이션 파일
├── modules/           # 도메인별 모듈 (auth, user 등)
├── types/             # 전역 타입, 인터페이스
└── main.ts            # 애플리케이션 진입점
```

---

## ✨ 커밋 메시지 컨벤션

### ✅ 기본 포맷

```
<type>(<scope>): <Summary>

<본문 설명 - 옵션>
```

### ✅ 예시

```
feat(auth): Add signup/signin service using UserService
fix(user): Fix password comparison logic
```

### ✅ 커밋 타입

| 타입     | 설명                           |
| -------- | ------------------------------ |
| feat     | 기능 추가                      |
| fix      | 버그 수정                      |
| docs     | 문서 작성/수정                 |
| chore    | 빌드 설정, 패키지 등 기타 변경 |
| refactor | 리팩토링 (기능 변경 없음)      |

📄 더 보기: [`commit-style-guideline.md`](./commit-style-guideline.md)

---

## ⚙ 자동 커밋 툴 설정

### 사용 도구

- `commitizen` (프롬프트 기반 커밋)
- `commitlint` + `husky` (커밋 메시지 검사)

### 사용 방법

```bash
npm install -D commitizen @commitlint/{config-conventional,cli} husky cz-conventional-changelog
npx husky install
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

커밋할 땐:

```bash
npm run commit
```

---

## 🔍 서비스 계층 메서드 패턴

> 서비스 계층에서 네이밍만으로도 동작을 예측할 수 있도록 구성합니다.

| 메서드       | 설명                         |
| ------------ | ---------------------------- |
| findOneByX() | 객체 조회 (null 반환)        |
| getOneByX()  | 객체 조회 (없으면 예외 발생) |
| existsByX()  | 존재 여부 boolean 반환       |
| create()     | 유효성 검사 후 생성          |
| update()     | 상태 변경                    |
| delete()     | 삭제 (soft/hard 모두 가능)   |

📄 더 보기: [`service-pattern-guideline.md`](./service-pattern-guideline.md)

---

## 🚀 VSCode 스니펫 설정

`.vscode/service-methods.code-snippets`에 스니펫 파일을 추가하면 `findOneBy`, `getOneBy`, `existsBy` 자동 완성 가능:

```json
"FindOneBy": {
  "prefix": "findOneBy",
  "body": [
    "async findOneBy${1:Field}(value: ${2:string}): Promise<${3:Entity} | null> {",
    "  return this.repo.findOneBy({ ${1/(.*)/${1:/camelcase}/}: value });",
    "}"
  ]
}
```

---

## 📦 환경 변수 타입 선언

`env.d.ts` 파일에 다음과 같이 선언하면 자동완성 가능:

```ts
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    DB: 'mysql' | 'postgres';
    PORT: string;
  }
}
```

---

## 📘 CHANGELOG란?

- 버전별 변경사항을 기록한 문서
- `standard-version`, `semantic-release` 등을 통해 자동 생성 가능

```md
## [1.2.0] - 2025-04-06

### Added

- Add signup logic
- Add nickname duplication check
```

---

## ✅ 기타

- `ValidationPipe`는 `main.ts`에서 전역 설정하여 DTO 기반 유효성 검사 활성화
- DTO는 class-validator로 검증하고, entity는 반환 전 변환하여 `@Exclude()`로 필터링

---

> 이 프로젝트는 실무 수준의 NestJS 서버 구조 학습 및 적용을 목표로 구성되어 있습니다 😎
