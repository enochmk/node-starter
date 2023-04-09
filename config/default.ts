import dotenv from 'dotenv';

dotenv.config();

const settings = {
  port: 5000,
  env: 'development',
  service: process.env.LOG_SERVICE || 'default',
  jwt: {
    accessExpireIn: process.env.TOKEN_EXPIRES_IN || '1h',
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'secret',
  },
  corsOptions: {
    origin: [`http://localhost:${process.env.PORT || 5000}`],
  },
  logger: {
    console: true,
    level: 'verbose',
    dirname: process.env.LOG_DIRECTORY || 'logs',
    datePattern: 'YYYYMMDD',
  },
};

export default settings;
