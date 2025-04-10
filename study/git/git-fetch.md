# 🔄 Git Fetch 이후 흐름 정리 가이드

> 이 문서는 `git fetch` 이후 상황에 따라 무엇을 할 수 있는지 흐름별로 정리한 안내서입니다.

---

## 🧠 `git fetch`란?

- `git fetch`는 **원격 저장소의 최신 정보를 가져오지만**,
  **내 로컬 브랜치는 건드리지 않는 명령어**입니다.
- 쉽게 말해: "**최신 내용만 확인하고, 당장 병합은 하지 마!**"

---

## 🔍 fetch 이후 자주 쓰이는 흐름

### ✅ 1. 원격 커밋만 확인하고 싶을 때

```bash
git fetch
git log HEAD..origin/main --oneline
```

### ✅ 2. 최신 내용을 병합하고 싶을 때

```bash
git fetch
git merge origin/main
```

_또는 단축키:_

```bash
git pull  # (fetch + merge 동작)
```

### ✅ 3. 깔끔하게 최신 브랜치 위에 내 커밋 쌓기 (rebase)

```bash
git fetch
git rebase origin/main
```

### ✅ 4. 로컬 작업을 전부 초기화하고 원격 상태로 맞추기 (⚠ 위험)

```bash
git fetch
git reset --hard origin/main
```

### ✅ 5. 원격에서 삭제된 브랜치도 정리하기

```bash
git fetch --prune
```

---

## 🧾 요약 테이블

| 목적                   | 명령어 조합                 | 특징                     |
| ---------------------- | --------------------------- | ------------------------ |
| 원격 커밋만 확인       | `fetch + log`               | 안전하게 확인만 가능     |
| 최신 내용 병합         | `fetch + merge` 또는 `pull` | 충돌 가능                |
| 히스토리 깔끔하게 정리 | `fetch + rebase`            | 커밋 정리 용이           |
| 강제로 원격과 동기화   | `fetch + reset --hard`      | ⚠ 로컬 작업 전부 삭제됨 |
| 삭제된 브랜치 정리     | `fetch --prune`             | 브랜치 청소 용도         |

---

## 🧪 실전 예시: 최신 내용 가져오고 깔끔하게 적용하기

```bash
git fetch
# 어떤 커밋이 생겼는지 확인
git log HEAD..origin/main --oneline

# 내 커밋을 최신 브랜치 위에 깔끔하게 쌓기
git rebase origin/main
```

---

## 🔁 브랜치 정리 팁

```bash
git fetch --prune   # 원격에서 삭제된 브랜치 정리
```
