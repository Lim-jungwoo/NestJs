# 🛠️ `scripts/` 폴더 사용 가이드

NestJS 또는 일반 Node.js 프로젝트에서 `scripts/` 폴더는 **개발 및 운영 자동화를 위한 셸 스크립트(.sh) 및 TypeScript(.ts)** 파일들을 정리하는 용도로 사용됩니다.

---

## 📂 폴더 구조 예시

```
project-root/
├── src/
├── scripts/
│   ├── bash/
│   │   ├── generate-index.sh       # 인덱스 자동 생성
│   │   ├── init-db.sh              # 데이터베이스 초기화
│   │   ├── setup-env.sh            # 환경 변수 템플릿 설정
│   │   ├── migrate.sh              # 마이그레이션 실행
│   │   └── start-dev.sh            # 개발 서버 실행
│   └── ts/
│       └── sync-config.ts          # 설정 파일 자동 병합 등 고급 기능
├── .env
├── package.json
└── README.md
```

---

## 🧾 각 파일 용도

| 파일명 / 경로            | 설명                                                 |
| ------------------------ | ---------------------------------------------------- |
| `bash/generate-index.sh` | 디렉토리 내 `.ts` 파일들을 index.ts로 자동 정리      |
| `bash/init-db.sh`        | DB 초기화, 마이그레이션, 시드 데이터를 자동 실행     |
| `bash/setup-env.sh`      | `.env.example` 기반으로 `.env` 생성 또는 템플릿 복사 |
| `bash/migrate.sh`        | TypeORM, Prisma 등 마이그레이션 명령 실행            |
| `bash/start-dev.sh`      | 개발 서버 시작 (`yarn start:dev` 등 래핑)            |
| `ts/sync-config.ts`      | TypeScript 기반 고급 자동화 로직 (예: 설정 동기화)   |

---

## 🚀 실행 방법

### 1. `.sh` 실행 권한 부여 (최초 1회)

```bash
chmod +x ./scripts/bash/*.sh
```

### 2. 실행

```bash
./scripts/bash/generate-index.sh
```

또는 실행 권한 없이:

```bash
bash ./scripts/bash/generate-index.sh
```

### 3. `.ts` 스크립트 실행

```bash
npx ts-node ./scripts/ts/sync-config.ts
```

---

## 📦 package.json에 등록

```json
"scripts": {
  "gen:index": "./scripts/bash/generate-index.sh",
  "db:init": "./scripts/bash/init-db.sh",
  "start:dev": "./scripts/bash/start-dev.sh",
  "sync:config": "ts-node ./scripts/ts/sync-config.ts"
}
```

실행:

```bash
yarn gen:index
yarn db:init
yarn sync:config
```

---

## 🧪 스크립트 템플릿 예시

### `generate-index.sh`

```bash
#!/bin/bash

TARGET_DIR=${1:-"src/modules"}
OUTPUT_FILE="$TARGET_DIR/index.ts"

echo "// auto-generated index.ts" > $OUTPUT_FILE

for file in $TARGET_DIR/*.ts; do
  filename=$(basename -- "$file")
  name="${filename%.ts}"
  if [ "$name" != "index" ]; then
    echo "export * from './$name';" >> $OUTPUT_FILE
  fi
done

echo "✅ index.ts created in $TARGET_DIR"
```

### `init-db.sh`

```bash
#!/bin/bash

npm run typeorm migration:revert -d src/database/data-source.ts
npm run typeorm migration:run -d src/database/data-source.ts
```

### `setup-env.sh`

```bash
#!/bin/bash

if [ -f .env ]; then
  echo ".env already exists. Skipping."
else
  cp .env.example .env
  echo ".env file created from .env.example"
fi
```

### `migrate.sh`

```bash
#!/bin/bash

timestamp=$(date +%Y%m%d%H%M%S)
npm run typeorm migration:generate -- -n ${timestamp}-Auto -d src/database/data-source.ts
```

### `start-dev.sh`

```bash
#!/bin/bash

yarn start:dev
```

### `sync-config.ts`

```ts
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(__dirname, '../../.env');
const configJsonPath = path.resolve(__dirname, '../../config/config.json');

const config = {
  env: fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : 'No .env',
  updated: new Date().toISOString(),
};

fs.writeFileSync(configJsonPath, JSON.stringify(config, null, 2));
console.log('✅ config.json synced with .env timestamp.');
```

---

## 📝 관리 팁

- 모든 `.sh` 파일은 `scripts/bash/`, `.ts` 스크립트는 `scripts/ts/`에 분리 정리
- 각 스크립트에는 사용법과 목적을 주석으로 꼭 작성
- 중요한 실행 전/후 조건이 있다면 echo 또는 log로 출력하여 명확히 표현

---
