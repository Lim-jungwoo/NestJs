import { DataSource } from 'typeorm';
import * as path from 'path';

export const MySqlDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'nest_js',
  password: 'nest_js',
  database: 'nest_js',
  entities: [path.join(__dirname, '**', '*.entity.{js,ts}')],
  migrations: [path.join(__dirname, 'migrations', '*.{js,ts}')],
  synchronize: false,
});
