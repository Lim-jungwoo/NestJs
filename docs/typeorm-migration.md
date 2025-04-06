## NestJS & TypeORM - 마이그레이션 실행 방법

이 문서에서는 TypeScript로 작성된 `typeorm` 마이그레이션을 실행하는 방법을 설명합니다. `ts-node`와 `tsconfig-paths/register`를 사용하여 TypeORM CLI 명령어를 실행하는 방법을 다룹니다.

### 명령어 설명

```bash
ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d src/data-source.ts
```

### 명령어 구성 요소

1. **`ts-node`**  
   `ts-node`는 TypeScript 파일을 실행할 수 있게 해주는 도구입니다. TypeScript 파일을 컴파일 없이 바로 실행할 수 있도록 도와줍니다. 이 명령어는 TypeScript 파일을 실행하는 데 사용됩니다.

2. **`-r tsconfig-paths/register`**  
   `-r` 옵션은 Node.js가 실행되기 전에 지정된 모듈을 로드하도록 합니다.  
   `tsconfig-paths/register`는 `tsconfig.json` 파일에 설정된 **경로(alias)** 를 올바르게 처리할 수 있도록 해주는 패키지입니다. 이 패키지가 로드되면, TypeScript 경로 별칭(`baseUrl`과 `paths`)을 제대로 처리할 수 있게 됩니다.

   예를 들어, `tsconfig.json`에서 아래와 같은 경로 설정을 했다면:

   ```json
   {
     "compilerOptions": {
       "baseUrl": "./src",
       "paths": {
         "@models/*": ["models/*"]
       }
     }
   }
   ```

   `tsconfig-paths/register`는 위 경로 별칭을 `ts-node`가 실행할 때 자동으로 해석할 수 있게 합니다.

3. **`./node_modules/typeorm/cli.js`**  
   TypeORM의 CLI를 실행하는 파일입니다. `typeorm`은 데이터베이스 관련 명령어를 실행할 수 있는 CLI 툴을 제공합니다. 예를 들어, 마이그레이션을 실행하거나 엔티티를 동기화하는 작업을 수행할 수 있습니다.

4. **`migration:run`**  
   TypeORM의 마이그레이션을 실행하는 명령어입니다. 이 명령어는 데이터베이스 마이그레이션을 실행하여, DB 스키마를 변경하는 작업을 자동으로 처리합니다.  
   `migration:run` 명령어는 `src/migrations` 폴더 내에 정의된 마이그레이션 파일을 실행하여, 데이터베이스를 업데이트합니다.

5. **`-d src/data-source.ts`**  
   `-d` 옵션은 **데이터 소스 파일**을 지정하는 데 사용됩니다.  
   이 파일은 TypeORM의 데이터베이스 연결 정보와 엔티티, 마이그레이션 파일 경로 등을 설정하는 파일입니다. `src/data-source.ts`는 TypeORM이 데이터베이스 연결을 설정하고, 엔티티 및 마이그레이션 파일을 로드할 수 있도록 도와줍니다.

   예시 데이터 소스 파일 (`src/data-source.ts`):

   ```typescript
   import { DataSource } from 'typeorm';
   import { User } from './entities/user.entity';

   export const MySqlDataSource = new DataSource({
     type: 'mysql',
     host: 'localhost',
     port: 3306,
     username: 'root',
     password: 'password',
     database: 'test_db',
     entities: [User],
     migrations: ['./src/migrations/*.ts'],
     synchronize: false,
   });
   ```

### 전체 흐름

이 명령어는 **TypeScript로 작성된 TypeORM 마이그레이션을 실행**하는 과정입니다. `ts-node`를 사용하여 TypeScript 파일을 실행하며, `tsconfig-paths/register`를 통해 TypeScript 경로 별칭을 처리하고, `typeorm` CLI를 실행하여 데이터베이스 마이그레이션을 적용합니다.

### 실행 순서:

1. `ts-node`가 TypeScript 파일을 실행하도록 설정됩니다.
2. `-r tsconfig-paths/register`가 `tsconfig.json` 파일의 경로 설정을 제대로 처리할 수 있도록 합니다.
3. `typeorm/cli.js`를 실행하여 TypeORM CLI 명령어가 시작됩니다.
4. `migration:run` 명령어를 통해 마이그레이션 파일이 실행됩니다.
5. `-d src/data-source.ts`에서 데이터베이스 연결 정보와 마이그레이션 경로를 설정한 `data-source.ts` 파일을 사용하여 마이그레이션이 실행됩니다.

### 마이그레이션을 실행할 때 주의사항

- **`tsconfig.json`**: `baseUrl`과 `paths`가 제대로 설정되어 있는지 확인해야 합니다.
- **데이터 소스 파일**: `src/data-source.ts` 파일에 데이터베이스 연결 정보와 엔티티, 마이그레이션 경로가 정확히 설정되어 있어야 합니다.
- **마이그레이션 파일**: `src/migrations` 폴더에 마이그레이션 파일이 생성되어 있어야 합니다.

### 예시:

```bash
# TypeORM 마이그레이션 실행 예시
ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d src/data-source.ts
```

이 명령어를 실행하면, `src/data-source.ts`에서 설정한 데이터베이스와 연결하여 마이그레이션 파일을 실행하고, 데이터베이스 스키마를 업데이트합니다.
