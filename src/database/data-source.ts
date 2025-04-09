import { DataSource } from 'typeorm';
import * as path from 'path';
import { DBType } from '../types/env';

export const MySqlDataSource = new DataSource({
  type: (process.env.DB_TYPE as DBType) || 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'nest_js',
  password: process.env.DB_PASS || 'nest_js',
  database: process.env.DB_NAME || 'nest_js',
  entities: [path.join(__dirname, '**', '*.entity.{js,ts}')],
  migrations: [path.join(__dirname, 'migrations', '*.{js,ts}')],
  synchronize: false,
});
