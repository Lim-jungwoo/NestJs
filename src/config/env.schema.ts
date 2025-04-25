import { z } from 'zod';

export const envSchema = z.object({
  // Domain
  DOMAIN: z.string().optional(),

  // TimeZone
  TZ: z.string().default('Asia/Seoul'),

  // Swagger
  SWAGGER_PATH: z.string().default('api'),

  // MariaDB
  DB_TYPE: z.enum(['mysql', 'mariadb']).default('mysql'),
  DB_HOST: z.string(),
  DB_PORT: z.string().transform((val) => parseInt(val, 10)),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_NAME: z.string(),
  DB_MANAGE_NAME: z.string(),

  // JWT
  JWT_ACCESS_SECRET: z.string(),
  JWT_ACCESS_EXPIRE: z.string().default('1d'),
  JWT_ACCESS_ALGORITHM: z.enum(['RS256', 'HS256']).default('RS256'),
  JWT_ACCESS_PRIVATE_KEY_PATH: z.string(),
  JWT_ACCESS_PUBLIC_KEY_PATH: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_REFRESH_EXPIRE: z.string().default('7d'),
  JWT_REFRESH_ALGORITHM: z.enum(['RS256', 'HS256']).default('RS256'),
  JWT_REFRESH_PRIVATE_KEY_PATH: z.string(),
  JWT_REFRESH_PUBLIC_KEY_PATH: z.string(),
  JWT_MANAGER_ACCESS_SECRET: z.string(),
  JWT_MANAGER_ACCESS_EXPIRE: z.string().default('1d'),
  JWT_MANAGER_REFRESH_SECRET: z.string(),
  JWT_MANAGER_REFRESH_EXPIRE: z.string().default('7d'),

  // SSL
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default('3000'),
  HOST: z.string().default('localhost'),
  SSL: z.enum(['true', 'false']).default('false'),
  SSL_KEY_PATH: z.string().optional(),
  SSL_CERT_PATH: z.string().optional(),

  // Redis
  REDIS_NAME: z.string().default('REDIS'),
  REDIS_HOST: z.string(),
  REDIS_PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default('6379'),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_DB: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default('1'),

  // Google Oauth
  CLIENT_ID: z.string().optional(),
  CLIENT_SECRET: z.string().optional(),
  CALLBACK_URL: z.string().url().optional().or(z.literal('')),
  ANDROID_PUBLISHER_URL: z
    .string()
    .url()
    .default('https://www.googleapis.com/auth/androidpublisher'),
  GOOGLE_IAP_URL: z
    .string()
    .url()
    .default(
      'https://androidpublisher.googleapis.com/androidpublisher/v3/applications/',
    ),

  // Apple Oauth
  APPLE_CLIENTID: z.string().optional(),
  APPLE_TEAMID: z.string().optional(),
  APPLE_KEYID: z.string().optional(),
  APPLE_CALLBACK: z.string().url().optional().or(z.literal('')),
  APPLE_KEYFILE_PATH: z.string().optional(),
  APPLE_SECRET: z.string().optional(),
});

// Example usage to parse and validate environment variables
// export const parsedEnv = envSchema.parse(process.env);

export type EnvSchema = z.infer<typeof envSchema>;
