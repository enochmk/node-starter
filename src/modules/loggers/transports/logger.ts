import winston from 'winston';
import consoleTransport from './consoleTransport';
import fileTransport from './fileTransport';

const config = {
  console: true,
  service: 'Starter-service',
  level: `${process.env.LOG_LEVEL || 'info'}`,
  dirname: `${process.env.LOG_DIRECTORY || 'logs'}`,
  datePattern: 'YYYY-MM-DD',
};

const service = config.service;

// configure transports
const transports = [consoleTransport, fileTransport];

// configure logger with label
function configureLogger(label: string) {
  return winston.createLogger({
    transports: transports,
    levels: winston.config.npm.levels,
    defaultMeta: { service, label },
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.errors({ stack: true }),
    ),
  });
}

export default configureLogger;
