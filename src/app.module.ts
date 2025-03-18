import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

console.log('=============================================================');
console.log('NODE_ENV: ', process.env.NODE_ENV);
console.log(
  'env 파일 경로:' + `${path.join(__dirname, `.${process.env.NODE_ENV}.env`)}`,
);
console.log('=============================================================');

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${path.join(__dirname, `.${process.env.NODE_ENV}.env`)}`,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
