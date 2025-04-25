import { envSchema } from './env.schema';
import { config } from 'dotenv';
import * as path from 'path';
import { ENV_PATH } from './constants';

config({
  path: `${path.join(__dirname, '..', ENV_PATH)}`,
});

export const validatedEnv = envSchema.parse(process.env);
