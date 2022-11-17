import config from 'config';
import winston from 'winston';
import consoleTransport from './transports/consoleTransport';
import fileTransport from './transports/fileTransport';

const service: string = config.get('logger.service');

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
