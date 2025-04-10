# 🔍 Git 커밋 메시지 검색 & 수정 가이드

Git 사용 중 커밋 메시지를 검색하거나 이전 커밋을 수정해야 할 때가 있습니다. 이 문서는 그러한 상황에서 활용할 수 있는 명령어들을 정리한 가이드입니다.

---

## 1️⃣ 커밋 메시지 검색 방법

### 📌 기본 로그 검색

```bash
git log --oneline
```

### 🔍 메시지 내용으로 검색

```bash
# feat으로 시작하는 커밋 찾기
git log --grep="^feat"

# 특정 스코프 포함 커밋 찾기
git log --grep="^fix(auth)"

# 메시지 내 키워드 포함 커밋 찾기
git log --grep="password"
```

### 🧠 이모지 기반 검색

```bash
# 이모지가 포함된 커밋만 검색
git log --grep="✨"
```

### 📋 한 줄 요약만 보기

```bash
git log --oneline --grep="study"
```

> 💡 참고: `--extended-regexp`, `--author=`, `--since=` 등 옵션도 함께 사용 가능

---

## 2️⃣ 이전 커밋 수정 방법

### ✍️ 마지막 커밋 메시지 수정

```bash
git commit --amend
```

- 메시지 수정 또는 변경사항 추가 가능
- 수정 후 저장하면 기존 커밋 덮어쓰기 (주의: 이미 푸시했다면 강제 푸시 필요)

### 🔄 마지막 커밋에 변경 사항 추가하기

```bash
# 새 파일/수정 파일 스테이지에 올린 후
git add .

# 마지막 커밋에 포함시키기
git commit --amend --no-edit
```

- 커밋 메시지는 그대로 두고, 내용만 추가됨

### 🔙 여러 커밋 수정 (주의!)

```bash
git rebase -i HEAD~3
```

- 최근 3개의 커밋 목록이 뜸
- 메시지를 수정하려면 `pick` → `reword`로 변경

> ⚠️ 주의: 이미 푸시된 커밋을 수정한 경우, 다음과 같이 강제 푸시가 필요함

```bash
git push --force
```

---

## ✅ 요약

| 작업 종류        | 명령어 예시                    |
| ---------------- | ------------------------------ |
| 커밋 메시지 검색 | `git log --grep="^feat"`       |
| 이모지 검색      | `git log --grep="🧠"`          |
| 커밋 메시지 수정 | `git commit --amend`           |
| 내용 추가        | `git commit --amend --no-edit` |
| 여러 커밋 수정   | `git rebase -i HEAD~N`         |

---
