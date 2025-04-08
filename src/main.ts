import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  //# SSL
  const ssl = process.env.SSL === 'true' ? true : false;
  let httpsOptions = null;
  if (ssl) {
    const keyPath = process.env.SSL_KEY_PATH || '';
    const certPath = process.env.SSL_CERT_PATH || '';
    httpsOptions = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    };
  }
  const app = await NestFactory.create(AppModule, { httpsOptions });

  //# Config
  const configService = app.get(ConfigService);

  //# Host & Port
  const host = configService.get<string>('HOST');
  const port = configService.get<string>('PORT');

  console.log('==========================');
  console.log('HOST: ', host);
  console.log('PORT: ', port);
  console.log('==========================');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
