# 🧳 Git Stash 사용 가이드

`git stash`는 작업 중인 변경사항을 임시 저장하고, 워킹 디렉토리를 깨끗하게 만드는 도구입니다. 이 문서는 stash의 고급 사용법과 실전 활용법을 다룹니다.

---

## 📦 기본 사용법

```bash
git stash                # 기본 stash (전체 변경사항 저장)
git stash push -m "메시지"   # 설명을 붙여서 stash
```

```bash
git stash apply          # 가장 최근 stash 적용 (stash는 유지됨)
git stash pop            # 적용 후 stash 삭제됨
```

---

## 🎯 특정 파일만 stash 하기

```bash
git stash push -m "로그인 로직 저장" src/modules/auth/auth.service.ts
```

- 지정한 파일만 임시 저장됨
- 나머지 파일은 워킹 디렉토리에 그대로 있음

---

## 📋 stash 목록 보기 & 선택적 적용

```bash
git stash list                 # 모든 stash 목록 보기

git stash apply stash@{1}     # 특정 stash 적용 (유지됨)
git stash pop stash@{1}       # 특정 stash 적용 후 삭제
```

---

## 🔍 stash 내용 확인

```bash
git stash show stash@{0}       # 변경된 파일 목록

git stash show -p stash@{0}    # 실제 diff 내용 확인
```

---

## 🔁 충돌이 발생한 경우 처리 방법

```bash
git stash apply  # 충돌 발생 가능
```

1. 충돌된 파일 직접 수정
2. 수정 후 `git add`
3. 충돌 정리 후 stash 삭제:

```bash
git stash drop stash@{0}
```

> ⚠ `git stash pop`은 자동 삭제되므로, 충돌 가능성이 있다면 `apply`를 먼저 사용하는 것이 안전합니다.

---

## ✂️ stash에서 특정 파일만 꺼내오기

```bash
git checkout stash@{0} -- path/to/file.ts
```

- 전체 stash 적용 없이 필요한 파일만 복원할 수 있음
- 부분 복구 시 유용함

---

## ✅ 요약 명령어 정리

| 목적                | 명령어 예시                                    |
| ------------------- | ---------------------------------------------- |
| 전체 변경사항 stash | `git stash`                                    |
| 특정 파일 stash     | `git stash push path/to/file.ts`               |
| stash 목록 보기     | `git stash list`                               |
| 특정 stash 적용     | `git stash apply stash@{1}`                    |
| stash 내용 확인     | `git stash show -p stash@{0}`                  |
| 충돌 처리 후 삭제   | `git add . && git stash drop stash@{0}`        |
| 특정 파일만 복원    | `git checkout stash@{0} -- src/app.service.ts` |

---
