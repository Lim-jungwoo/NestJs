# 📝 커밋 메시지 작성 가이드라인

이 프로젝트는 **Conventional Commits** 스타일을 기반으로 커밋 메시지를 작성합니다.
다만, **본문 메시지 설명란은 대문자로 시작**하는 방식으로 사용합니다.

---

## ✨ 기본 포맷

```
type(scope): Summary of commit (Present tense, 시작은 대문자)
```

```
<type>(<scope>): <Summary>

<본문 설명 - 선택 사항>

BREAKING CHANGE: (옵션)
Closes #이슈번호 (옵션)
```

---

## ✅ 빠르게 복사해서 쓰기

```
<type>(<scope>): <Summary>

- <변경 사항 요약>
- <왜 바꿨는지>
- <추가로 고려할 사항>

Closes #이슈번호
```

---

### 예시:

```
feat(app): Add global validation and transform pipe
fix(auth): Handle incorrect password validation
chore(config): Update tsconfig paths
```

```
feat(auth): Add user service-based signup/signin logic

- Refactor signup and signin to use UserService
- Add duplicate email/nickname checks
- Use hashed password with bcrypt
- Improve error handling with CustomException

Closes #42
```

---

## 🔠 커밋 타입 목록

| 타입       | 이모지 | 설명                                                |
| ---------- | ------ | --------------------------------------------------- |
| `feat`     | ✨     | 새로운 기능 추가 (Feature)                          |
| `fix`      | 🐛     | 버그 수정                                           |
| `docs`     | 📚     | 문서 수정 (README, 주석 등)                         |
| `style`    | 💄     | 코드 포맷팅, 세미콜론 등 문법 변경 (기능 변화 없음) |
| `refactor` | ♻️     | 코드 리팩토링 (기능 변화 없음, 버그 수정 아님)      |
| `test`     | ✅     | 테스트 코드 추가 및 수정                            |
| `chore`    | 🔧     | 빌드, 설정 파일 수정 등 기타 잡일                   |
| `perf`     | ⚡     | 성능 개선                                           |
| `ci`       | 🔁     | CI 관련 설정 수정 (GitHub Actions 등)               |
| `build`    | 🏗️     | 빌드 관련 파일 수정 (예: package.json, webpack 등)  |
| `revert`   | ⏪     | 이전 커밋 되돌리기                                  |
| `study`    | 🧠     | 학습용 파일, 정리 문서 작성 또는 업데이트           |

---

## 🔧 scope 예시

- `app`: 애플리케이션 전역 설정 (main.ts 등)
- `auth`: 인증/인가 로직
- `user`: 유저 관련 서비스, 컨트롤러, DTO 등
- `config`: 환경설정, config 파일
- `docs`: 문서 및 study 파일
- `migration`: 마이그레이션

---

## 💬 작성 규칙

- `:` 뒤 메시지 설명의 **첫 단어는 대문자**로 시작
- **명령형 시제** 사용: `Add`, `Fix`, `Update`, `Refactor`, `Create`, ...
- 영어로 작성
- 필요 시 본문 또는 Footer에 추가 설명 가능
- 한 줄 요약은 50자 이내 권장
- 본문은 여러 줄 가능 (리스트 형식 추천)

---

## ✅ 좋은 예

```
feat(user): Add nickname duplication check
fix(auth): Fix password comparison logic
```

## ❌ 나쁜 예

```
feat user Add validation  ❌ 타입/스코프 없음
Added new feature         ❌ 명령형 아님
feat(user): added new api ❌ 소문자 시작
```

---

## 📌 Tip

- 커밋 단위는 의미 있는 변경 사항 단위로 자를 것
- 하나의 커밋은 하나의 목적만 가지도록 작성

---
