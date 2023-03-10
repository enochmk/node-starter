import dotenv from 'dotenv';

dotenv.config();

const settings = {
  port: 5000,
  env: 'development',
  jwt: {
    accessExpireIn: process.env.TOKEN_EXPIRES_IN || '1h',
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'secret',
  },
  corsOptions: {
    origin: ['http://localhost:3000'],
  },
  logger: {
    console: true,
    level: 'verbose',
    service: process.env.LOG_SERVICE || 'default',
    dirname: process.env.LOG_DIRECTORY || 'logs',
    datePattern: 'YYYYMMDD',
  },
};

export default settings;
