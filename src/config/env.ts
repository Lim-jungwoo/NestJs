import { envSchema } from './env.schema';
import { config } from 'dotenv';
import * as path from 'path';
import { NODE_ENV } from './constants';

config({
  path: `${path.join(__dirname, '..', `.${NODE_ENV}.env`)}`,
});

export const validatedEnv = envSchema.parse(process.env);
