import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { envSchema } from './env.schema';
import { TypedConfigService } from './typed-config.service';
import { NODE_ENV } from './constants';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${path.join(__dirname, `.${NODE_ENV}.env`)}`,
      cache: true,
      isGlobal: true,
      validate: (env) => {
        const result = envSchema.safeParse(env);
        if (!result.success) {
          console.error('❌ Invalid ENV:', result.error.format());
          process.exit(1);
        }
        return result.data;
      },
    }),
  ],
  providers: [TypedConfigService],
  exports: [TypedConfigService],
})
export class EnvModule {}
