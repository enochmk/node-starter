import dotenv from 'dotenv';

dotenv.config();

const settings = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  service: process.env.LOG_SERVICE || 'DEFAULT',
  corsOptions: {},
  logger: {
    console: process.env.LOG_CONSOLE || true,
    level: process.env.LOG_LEVEL || 'info',
    dirname: process.env.LOG_DIRECTORY || 'logs',
    datePattern: 'YYYYMMDD',
  },
};

export default settings;
