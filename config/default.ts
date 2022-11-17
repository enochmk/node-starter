import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  logger: {
    console: true,
    service: 'Starter-service',
    level: `${process.env.LOG_LEVEL || 'info'}`,
    dirname: `${process.env.LOG_DIRECTORY || 'logs'}`,
    datePattern: 'YYYY-MM-DD',
  },
};
