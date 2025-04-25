import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as path from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { DataBaseModule } from './database/database.module';
import * as fs from 'fs';
import { EnvModule } from './config/env.module';
import { NODE_ENV } from './config/constants';

console.log('=============================================================');
console.log('NODE_ENV: ', NODE_ENV);
console.log('env 파일 경로:' + `${path.join(__dirname, `.${NODE_ENV}.env`)}`);
console.log(
  '📂 .env 파일 존재 여부:',
  fs.existsSync(`${path.join(__dirname, `.${NODE_ENV}.env`)}`),
);
console.log('=============================================================');

@Module({
  imports: [AuthModule, DataBaseModule, EnvModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
