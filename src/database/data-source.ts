import { DataSource } from 'typeorm';
import * as path from 'path';
import { validatedEnv } from 'src/config/env';

export const MySqlDataSource = new DataSource({
  type: validatedEnv.DB_TYPE || 'mysql',
  host: validatedEnv.DB_HOST || 'localhost',
  port: Number(validatedEnv.DB_PORT) || 3306,
  username: validatedEnv.DB_USER || 'nest_js',
  password: validatedEnv.DB_PASS || 'nest_js',
  database: validatedEnv.DB_NAME || 'nest_js',
  entities: [path.join(__dirname, '..', '**', '*.entity.{js,ts}')],
  migrations: [path.join(__dirname, 'migrations', '*.{js,ts}')],
  synchronize: false,
});
