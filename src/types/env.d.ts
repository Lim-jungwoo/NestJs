export type DBType = 'mysql' | 'postgres' | 'mariadb' | 'sqlite';

export interface EnvConfig {
  // Domain
  DOMAIN: string;

  // TimeZone
  TZ: string;

  // Swagger
  SWAGGER_PATH: string;

  // DB (MariaDB)
  DB: DBType;
  DB_HOST: string;
  DB_PORT: string;
  DB_USER: string;
  DB_PASS: string;
  DB_NAME: string;
  DB_MANAGE_NAME: string;

  // JWT
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRE: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRE: string;
  JWT_MANAGER_ACCESS_SECRET: string;
  JWT_MANAGER_ACCESS_EXPIRE: string;
  JWT_MANAGER_REFRESH_SECRET: string;
  JWT_MANAGER_REFRESH_EXPIRE: string;

  // SSL
  PORT: string; // 실제로는 number지만 process.env로 들어오면 string
  HOST: string;
  SSL: 'true' | 'false'; // boolean으로 파싱할 수도 있음
  SSL_KEY_PATH?: string;
  SSL_CERT_PATH?: string;

  // Redis
  REDIS_NAME: string;
  REDIS_HOST: string;
  REDIS_PORT: string;
  REDIS_PASSWORD: string;
  REDIS_DB: string;

  // Google Oauth
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  ANDROID_PUBLISHER_URL: string;
  GOOGLE_IAP_URL: string;

  // Apple Oauth
  APPLE_CLIENTID: string;
  APPLE_TEAMID: string;
  APPLE_KEYID: string;
  APPLE_CALLBACK: string;
  APPLE_KEYFILE_PATH: string;
  APPLE_SECRET: string;
}
