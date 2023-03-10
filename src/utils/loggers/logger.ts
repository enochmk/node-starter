import config from 'config';
import winston from 'winston';
import consoleTransport from './transports/console.transport';
import fileTransport from './transports/file.transport';

const service = config.get('logger.service');
const transports = [consoleTransport, fileTransport];

interface DefaultMeta {
  service?: string;
  label?: string;
}

export const getLogger = (options: DefaultMeta) => {
  return winston.createLogger({
    transports: transports,
    levels: winston.config.npm.levels,
    defaultMeta: options,
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
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
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
  ),
});

export default logger;
