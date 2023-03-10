import dotenv from 'dotenv';

dotenv.config();

const settings = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'production',
  corsOptions: {
    origin: [process.env.CORS_ORIGIN || ''],
  },
  logger: {
    console: true,
    level: 'info',
    dirname: process.env.LOG_DIRECTORY || 'logs',
    datePattern: 'YYYYMMDD',
  },
};

export default settings;
