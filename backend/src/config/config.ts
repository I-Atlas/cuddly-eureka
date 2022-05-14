export const ENVIRONMENT = process.env.APP_ENV || 'dev';
export const IS_PRODUCTION = ENVIRONMENT === 'production';
export const IS_TEST = ENVIRONMENT === 'test';
export const APP_PORT = Number(process.env.APP_PORT) || 9000;
export const APP_PREFIX_PATH = process.env.APP_PREFIX_PATH || '/';
export const JWT_SECRET = process.env.JWT_SECRET || 'somerandomkeyherena';
export const JWT_EXPIRE = process.env.JWT_EXPIRE || '1y';
export const DB = {
  USER: process.env.DATABASE_USERNAME,
  PASSWORD: process.env.DATABASE_PASSWORD,
  HOST: process.env.DATABASE_HOST,
  NAME: process.env.DATABASE_NAME,
  PORT: Number(process.env.DATABASE_PORT) || 27017,
};
export const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/Mocks';
