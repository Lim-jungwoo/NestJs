# 🧭 Git에서 "추적은 하되 스테이지에 올리지 않는 상태" 만드는 방법

Git은 기본적으로 `git add`를 통해 파일을 추적(Tracked)하기 시작합니다. 하지만 이 명령은 자동으로 "스테이징(Staging)"까지 수행하게 됩니다. 그렇다면 "추적만 하고, 스테이지에는 올리지 않는 상태"를 만들 수 있을까요?

> ✅ 정답: `git add` 후 `git reset HEAD <file>`을 통해 가능합니다.

---

## 🧠 Git 상태 3단계 요약

| 상태               | 설명                                     | 색상 표시 |
| ------------------ | ---------------------------------------- | --------- |
| Untracked          | Git이 전혀 모르는 파일                   | 🔴 빨간색 |
| Tracked + Unstaged | Git이 추적은 하지만 커밋 준비 안 된 상태 | 🟠 주황색 |
| Staged             | 커밋 준비 완료된 상태                    | 🟢 초록색 |

---

## ✅ 원하는 상태 만들기

### 🎯 목표:

> Git이 파일을 추적하되, 스테이지에는 올리지 않는다

### 🪜 실행 순서

```bash
# 1. 파일을 생성하거나 변경
$ echo "hello" > hi.txt

# 2. Git이 모르는 상태 (untracked)
$ git status
> Untracked files:
>   hi.txt

# 3. add로 추적 시작
$ git add hi.txt

# 4. 다시 스테이징에서 제거 (추적은 유지)
$ git reset HEAD hi.txt
```

### 📌 결과

- 파일은 이제 **Tracked + Unstaged 상태**
- `git status`에 **주황색**으로 표시됨
- `git stash`도 사용 가능함 ✅

---

## 🔄 예시 흐름 정리

```bash
touch example.ts
# 새 파일 생성 (Untracked)

git add example.ts
# Staged (초록색)

git reset HEAD example.ts
# Tracked but unstaged (주황색)
```

---

## 🧪 확인 방법

```bash
git status
```

출력 예:

```
Changes not staged for commit:
  modified:   example.ts
```

---

## ⚠️ 주의사항

- `.gitignore`에 포함된 파일은 Git이 **아예 무시**하기 때문에 위 방법으로도 추적 불가
- `reset`은 워킹 디렉토리의 파일 내용은 변경하지 않음

---

## ✅ 요약

| 목표 상태             | 필요한 명령어                              |
| --------------------- | ------------------------------------------ |
| 추적 안 됨            | (아무 것도 안 함)                          |
| 추적 + 스테이지       | `git add <file>`                           |
| 추적만, 스테이지 아님 | `git add <file>` → `git reset HEAD <file>` |

---

# 📘 Git: 추적되지만 스테이지에 올라가지 않은 상태의 사용 사례

Git에서 `git add`를 하면 파일이 추적(tracked)되며 동시에 스테이징(staged) 상태가 됩니다. 그러나 `git reset HEAD <파일>` 명령을 사용하면 **추적은 유지하되 스테이징 상태는 해제**할 수 있습니다.

이 문서는 그런 상태를 **의도적으로 만드는 실제 활용 시나리오**를 정리한 문서입니다.

---

## 🧠 상태 요약

| 상태                  | 설명                             |
| --------------------- | -------------------------------- |
| 🔴 Untracked          | Git이 모르는 새 파일             |
| 🟠 Tracked + Unstaged | Git은 추적 중이나 커밋 후보 아님 |
| 🟢 Staged             | 커밋될 준비 완료된 상태          |

---

## ✅ 실전 사용 사례

### 1. 🧳 Stash에 untracked 파일을 포함하고 싶을 때

`git stash`는 기본적으로 **untracked 파일을 무시**합니다.

```bash
# 새 파일을 stash에 포함시키는 방법
$ git add newfile.ts
$ git reset HEAD newfile.ts  # 추적은 유지, staged 제거
$ git stash                   # 정상적으로 stash 됨
```

---

### 2. 🧩 git diff로 변경 확인만 하고 싶을 때

```bash
# untracked 상태에서는 diff 불가
$ git diff newfile.ts         # 출력 없음

# 추적 후 unstaged 상태로 만들면 diff 가능
$ git add newfile.ts
$ git reset HEAD newfile.ts
$ git diff newfile.ts         # 변경 내용 확인 가능
```

---

### 3. 🎯 특정 파일만 선택적으로 커밋할 때

```bash
$ git add fileA.ts fileB.ts
$ git reset HEAD fileB.ts     # fileB는 커밋 제외
$ git commit -m "feat: update A only"
```

> fileB는 변경사항은 유지되지만 커밋되지 않음

---

### 4. ❌ 실수로 커밋되지 않게 예방할 때

예: 로컬 디버그 설정 파일 등 커밋 원치 않음

```bash
$ git add debug.config.ts
$ git reset HEAD debug.config.ts  # 추적은 하되 커밋 대상 제외
```

---

### 5. 🧱 배치 커밋 전 준비 상태 관리

여러 파일을 수정 중인데 일부만 우선 커밋하고 싶은 경우

```bash
$ git add a.ts b.ts c.ts
$ git reset HEAD b.ts c.ts        # 우선 a.ts만 커밋
$ git commit -m "feat: add a"
```

---

## ✅ 정리

| 목적                   | 활용 명령어 예시                  |
| ---------------------- | --------------------------------- |
| Stash에 untracked 포함 | `add` → `reset` 후 `stash`        |
| diff 보고 싶을 때      | `add` → `reset` 후 `diff`         |
| 선택 커밋 시           | 일부만 staged 상태 유지           |
| 실수 방지 (커밋 제외)  | 추적 유지 후 reset                |
| 커밋 순서 정리         | staged/unstaged 분리 후 순차 커밋 |

---

이 방식은 `stash`, `diff`, `partial commit` 등 다양한 실전 상황에서 매우 유용하게 사용됩니다
