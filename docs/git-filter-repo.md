# 🧠 한 줄 정의

> `git filter-repo`는 Git 저장소의 모든 커밋을 필터링해서
> **과거 커밋 히스토리를 수정하거나 정리**(특정 author/email 변경, 파일 삭제, 디렉토리 분리 등)을 빠르고 안전하게 해주는 도구

---

## ✅ 대표적인 사용 사례

| 사용 목적                  | 예시 명령어                       |
| -------------------------- | --------------------------------- |
| **이메일/이름 변경**       | author 이메일 일괄 수정           |
| **민감한 파일 삭제**       | `.env` 히스토리에서 완전 제거     |
| **서브디렉토리만 남기기**  | `--subdirectory-filter`           |
| **대형 파일 삭제**         | `.zip`, `.mp4` 등의 히스토리 제거 |
| **히스토리 사이즈 줄이기** | 전체 정리 후 용량 감소            |

---

## 🔧 설치 방법

### macOS (Homebrew)

```bash
brew install git-filter-repo
```

### 수동 설치

```bash
curl -o git-filter-repo.py https://raw.githubusercontent.com/newren/git-filter-repo/main/git-filter-repo.py
chmod +x git-filter-repo.py
```

> 또는 GitHub 공식 저장소: https://github.com/newren/git-filter-repo

---

## ✨ 자주 쓰는 명령어 예시

### 1. 모든 커밋의 이메일/이름 변경

```bash
git filter-repo --force --commit-callback '
commit.author_name = b"{author name}"
commit.author_email = b"{author email}"
commit.committer_name = b"{commiter name}"
commit.committer_email = b"{commiter email}"
'
```

### 2. 특정 파일을 **모든 히스토리에서 제거**

```bash
git filter-repo --path .env --invert-paths
```

> `.env` 파일을 과거 모든 커밋에서 완전히 삭제

### 3. 특정 디렉토리만 남기고 나머지 제거

```bash
git filter-repo --subdirectory-filter src/
```

> `src/` 안에 있는 것만 남기고 다른 건 모두 제거

---

## ⚠️ 주의할 점

- **기존 커밋 해시가 전부 바뀐다** (히스토리 rewrite)
- 이미 GitHub 등에 푸시했다면 → **`git push --force`** 필수
- 협업 중인 저장소라면 다른 사람과 공유 전에 조율 필요

---

## 🧼 원래 히스토리 복구하려면?

`filter-repo`는 자동으로 원본 백업 브랜치를 안 만들어주므로  
**직접 백업을 만드는 게 좋음**:

```bash
git branch backup-before-rewrite
```

---

## 🧠 `git filter-repo` vs `git filter-branch` vs `BFG`

| 도구               | 특징                              |
| ------------------ | --------------------------------- |
| `filter-branch`    | 오래되고 느림, 사용 어려움        |
| `BFG Repo-Cleaner` | 빠르지만 제한적 (파일 삭제 위주)  |
| ✅ `filter-repo`   | 빠르고 강력, **GitHub 공식 권장** |

---

## ✅ 요약

| 항목      | 내용                                                 |
| --------- | ---------------------------------------------------- |
| 역할      | Git 저장소 히스토리 전체 수정                        |
| 강점      | 빠름, 직관적, 안전                                   |
| 주의      | 히스토리 바뀜 → 강제 푸시 필요                       |
| 권장 상황 | 이메일/이름 바꾸기, 민감 파일 제거, 디렉토리 추출 등 |

---

# Commit email 수정 방법

## 🔧 정확한 절차 요약

```bash
# 1. 완전한 mirror 클론
git clone --mirror git@github.com-{user.name}:{git.email}/{git.repo.name}.git {git.repo.clone.name}
cd {git.repo.clone.name}
```

```bash
# 2. 전체 커밋 author/committer 바꾸기
git filter-repo --force --commit-callback '
commit.author_name = b"{author name}"
commit.author_email = b"{author email}"
commit.committer_name = b"{commiter name}"
commit.committer_email = b"{commiter email}"
'
```

```bash
# 3. 리모트 다시 연결 후 강제 푸시
git remote add origin git@github.com-{user.name}:{git.email}/{git.repo.name}.git
git push --mirror --force
```

---

## 🔍 왜 이게 중요한가?

- 일반적인 clone은 `.git/refs/remotes/origin/*` 브랜치를 만들어서 filter-repo가 건드리지 않음
- `--mirror`는 모든 브랜치/태그/리모트 정보 포함해서 **완전한 리포 복사본을 제공**함
- 그 위에서 filter-repo를 돌려야 **진짜 전체 히스토리를 건드릴 수 있다.**

---

## 💡 깔끔한 확인용 명령어

```bash
git rev-list --all | wc -l
```

→ 전체 커밋 수가 기존 개수로 유지된다면 OK  
→ 그 이후 `git log --all --format='%h | %an <%ae>'` 확인해서 모두 바뀌었는지 검증

---

## ✅ 다시 한번 요약

| 현상                                          | 이유                                  | 해결책                                  |
| --------------------------------------------- | ------------------------------------- | --------------------------------------- |
| 일부 커밋만 이메일 바뀜                       | filter-repo가 일부 브랜치/커밋만 처리 | `git clone --mirror`로 새로 받아서 작업 |
| remotes/origin/... 커밋이 filter-repo 대상 밖 | 일반 clone이라서 발생                 | mirror clone이 필수                     |
| 해결 후 강제 푸시 필요                        | GitHub 히스토리 반영하려면            | `git push --mirror --force`             |

---
