import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { validatedEnv } from 'src/config/env';

export const typeOrmConfig = async (): Promise<TypeOrmModuleOptions> => ({
  type: validatedEnv.DB_TYPE,
  host: validatedEnv.DB_HOST,
  port: validatedEnv.DB_PORT,
  username: validatedEnv.DB_USER,
  password: validatedEnv.DB_PASS,
  database: validatedEnv.DB_NAME,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: false,
});
