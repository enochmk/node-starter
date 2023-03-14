import config from 'config';
import winston from 'winston';
import consoleTransport from './transports/console.transport';
import fileTransport from './transports/file.transport';

const service = config.get('logger.service');
const transports = [consoleTransport, fileTransport];
const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const getLogger = (label: string) => {
  return winston.createLogger({
    transports: transports,
    levels: winston.config.npm.levels,
    defaultMeta: {
      label: label,
    },
    format: winston.format.combine(
      winston.format.timestamp({ format: TIMESTAMP_FORMAT }),
      winston.format.errors({ stack: true }),
    ),
  });
};

// configure logger with label
const logger = winston.createLogger({
  transports: transports,
  levels: winston.config.npm.levels,
  defaultMeta: { service },
  format: winston.format.combine(
    winston.format.timestamp({ format: TIMESTAMP_FORMAT }),
    winston.format.errors({ stack: true }),
  ),
});

export default logger;
