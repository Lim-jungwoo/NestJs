# 🐳 Docker 사용법 가이드

Docker는 애플리케이션을 **컨테이너**라는 격리된 환경에서 실행할 수 있게 도와주는 도구입니다. 이 문서에서는 Docker의 기본 개념과 실습 위주 사용법을 정리합니다.

---

## ✅ 기본 개념

| 용어                | 설명                                                           |
| ------------------- | -------------------------------------------------------------- |
| 이미지(Image)       | 실행 가능한 애플리케이션 + 환경 정보가 포함된 읽기 전용 템플릿 |
| 컨테이너(Container) | 이미지를 기반으로 실행된 **실제 인스턴스** (가상 환경)         |
| Dockerfile          | 이미지 생성을 위한 명령어 스크립트 파일                        |
| docker-compose      | 여러 컨테이너를 한 번에 정의하고 실행하는 구성 도구            |

---

## 🏁 설치 확인

```bash
docker -v
```

설치가 안 돼 있다면 [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/) 에서 Docker Desktop 설치.

---

## 📦 이미지 다운로드 & 실행

```bash
# 예: nginx 이미지 받아서 실행
docker run --name webserver -d -p 8080:80 nginx
```

- `--name`: 컨테이너 이름 지정
- `-d`: 백그라운드 실행
- `-p`: 포트 매핑 (호스트:컨테이너)

---

## 🧼 유용한 명령어 모음

```bash
docker images           # 이미지 목록
docker rmi <이미지ID>  # 이미지 삭제
docker logs <이름>      # 로그 확인
docker exec -it <이름> bash  # 컨테이너 내부 접속
docker volume ls        # 볼륨 목록
docker volume prune     # 사용하지 않는 볼륨 제거
```

---

## 🧠 정리

- Docker는 **개발환경 격리**와 **배포 일관성**을 위한 필수 도구
- `Dockerfile`로 이미지 생성 → `run`으로 실행
- 복잡한 구성은 `docker-compose.yml`로 한 번에 관리
- `.env`, `volumes`, `bind mount` 등을 이용해 유연한 설정 가능
- NestJS + MySQL 등 실전 프로젝트에 쉽게 적용 가능
- TypeORM 마이그레이션도 컨테이너 내에서 안전하게 수행 가능

---

## 🔄 컨테이너 상태 확인 및 조작

```bash
docker ps             # 실행 중인 컨테이너 목록
docker ps -a          # 전체 컨테이너 목록
docker stop <이름 또는 ID>   # 컨테이너 중지
docker start <이름 또는 ID>  # 다시 시작
docker rm <이름 또는 ID>     # 삭제
```

---

## 🛠️ Dockerfile 작성 예시

```Dockerfile
# Node.js 앱 예시
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start:dev"]
```

```bash
# 이미지 빌드
docker build -t my-nest-app .

# 실행
docker run -p 3000:3000 my-nest-app
```

---

## 📚 docker-compose 기본 예시

```yaml
version: '3.8'
services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: app_db
    ports:
      - '3306:3306'
    volumes:
      - ./mysql/data:/var/lib/mysql

  app:
    build: .
    ports:
      - '3000:3000'
    depends_on:
      - db
```

```bash
# 여러 컨테이너를 한 번에 실행
docker-compose up -d

# 중지 및 제거
docker-compose down
```

---

## 🧪 NestJS + MySQL 실전 예시

### 📁 폴더 구조 예시

```
project-root/
├── src/
├── docker-compose.yml
├── Dockerfile
├── .env
├── mysql/
│   └── data/
└── src/database/
    └── migrations/
```

### 🐳 docker-compose.yml

```yaml
version: '3.8'
services:
  db:
    image: mysql:8.0
    container_name: mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: nest_js
      MYSQL_USER: nest_user
      MYSQL_PASSWORD: nest_pass
    ports:
      - '3306:3306'
    volumes:
      - ./mysql/data:/var/lib/mysql

  app:
    build: .
    container_name: nest-app
    ports:
      - '3000:3000'
    depends_on:
      - db
    env_file:
      - .env
```

### 🛠 Dockerfile (NestJS)

```Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start:dev"]
```

---

## 📂 volumes & 바인드 마운트

### 📁 volumes

- **컨테이너 내부 데이터를 영구 저장**하는 공식 방식
- `docker volume`으로 별도 관리 가능

```yaml
volumes:
  - db-data:/var/lib/mysql

volumes:
  db-data:
```

### 🔗 bind mount

- **호스트 시스템의 폴더를 직접 연결**
- 코드 실시간 반영이 필요할 때 유용

```yaml
volumes:
  - .:/app
```

---

## ⚙️ Docker + TypeORM 마이그레이션

NestJS에서 TypeORM 마이그레이션을 Docker로 실행하려면:

### 1. `package.json`에 마이그레이션 스크립트 추가

```json
"scripts": {
  "migration:run": "ts-node -r tsconfig-paths/register src/database/data-source.ts migration:run",
  "migration:generate": "ts-node -r tsconfig-paths/register src/database/data-source.ts migration:generate -n",
  "migration:create": "ts-node -r tsconfig-paths/register src/database/data-source.ts migration:create -n"
}
```

### 2. 마이그레이션 명령 실행

```bash
# 컨테이너 내부에서 실행 (bash 진입)
docker exec -it nest-app sh

# 내부에서 마이그레이션 실행
npm run migration:run
```

또는 docker-compose를 통해 다음처럼 단발성으로 실행할 수 있습니다:

```bash
docker-compose exec app npm run migration:run
```

> `data-source.ts` 설정 시 host를 반드시 `db`로 설정해야 컨테이너 간 연결됩니다.

---

## 📌 요약

| 항목                | 목적 및 활용                                             |
| ------------------- | -------------------------------------------------------- |
| **Dockerfile**      | 어플리케이션을 컨테이너로 실행하기 위한 설정 파일        |
| **docker-compose**  | 여러 서비스(DB, 앱 등)를 동시에 실행하고 네트워크로 연결 |
| **override 파일**   | 환경 별 설정(개발/테스트/운영)을 유연하게 적용           |
| **Master/Slave DB** | 데이터 복제 및 읽기 성능 분산 테스트 환경 구성           |
| **CI/CD 통합**      | Docker로 빌드 및 테스트 환경을 자동화                    |

---

## 📁 디렉토리 구조

```
.
├── docker-compose.yml         # Docker 환경 정의
├── mysql/
│   ├── master/
│   │   ├── data/               # 마스터 DB 데이터 (볼륨)
│   │   └── init/               # 마스터 초기 실행 SQL
│   └── slave/
│       ├── data/               # 슬레이브 DB 데이터 (볼륨)
│       └── init/               # 슬레이브 초기 실행 SQL
└── src/                        # NestJS 소스 코드
```

---

## 🚀 실행 방법

```bash
# 컨테이너 실행
docker-compose up -d

# 중지 및 정리
docker-compose down
```

- 마스터: `localhost:3306`
- 슬레이브: `localhost:3307`

```bash
# 접속 예시
mysql -h 127.0.0.1 -P 3306 -u root -p  # master
mysql -h 127.0.0.1 -P 3307 -u root -p  # slave
```

---

## 🔧 마스터 초기 SQL (복제 계정 생성)

`mysql/master/init/create-replica-user.sql`

```sql
CREATE USER 'replica'@'%' IDENTIFIED BY 'replica_pass';
GRANT REPLICATION SLAVE ON *.* TO 'replica'@'%';
FLUSH PRIVILEGES;
```

---

## 🔧 슬레이브 초기 SQL (복제 시작)

`mysql/slave/init/setup-replication.sql`

```sql
CHANGE MASTER TO
  MASTER_HOST='mysql-master',
  MASTER_USER='replica',
  MASTER_PASSWORD='replica_pass',
  MASTER_LOG_FILE='mysql-bin.000001',
  MASTER_LOG_POS=4;

START SLAVE;
```

> 위 값은 처음 컨테이너 실행 후 `SHOW MASTER STATUS;` 명령으로 확인 가능

---

## ✅ 복제 확인 방법

```sql
SHOW SLAVE STATUS\G
```

- `Slave_IO_Running: Yes`
- `Slave_SQL_Running: Yes`

이면 복제 성공!

---

## 📘 참고

- NestJS에서 TypeORM `replication` 옵션을 사용하면 자동으로 읽기/쓰기를 분리해 요청을 보냅니다.
- Docker는 테스트/개발용 환경을 안전하게 분리하고 재현하는 데 매우 유용합니다.

---
