import dotenv from 'dotenv';
import ip from 'ip';

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
    corsOptions: {
      origin: [`http://${ip.address()}:3000`, process.env.ORIGIN || ''],
    },
  },
  logger: {
    console: true,
    level: 'info',
    dirname: process.env.LOG_DIRECTORY || 'logs',
    datePattern: 'YYYYMMDD',
  },
};

export default settings;
