import config from 'config';
import winston, { format } from 'winston';
import rtracer from 'cls-rtracer';
import 'winston-daily-rotate-file';

const service = config.get('logger.service');
const dirname = config.get('logger.dirname') as string;
const LEVEL = config.get('logger.level') as string;
const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/* ---------------------------------------- */
// log format
const fileLogFormat = format.printf((log: any): string => {
  const requestID = rtracer.id();
  const { message, level, timestamp, ...rest } = log;
  return JSON.stringify({
    timestamp: timestamp,
    requestID: requestID,
    level: level,
    message: message,
    metadata: rest,
  });
});

// File transport configuration
const fileTransport = new winston.transports.DailyRotateFile({
  level: LEVEL,
  dirname,
  datePattern: 'YYYYMMDD',
  filename: '%DATE%.log',
  format: winston.format.combine(fileLogFormat),
});

/* ---------------------------------------- */
// log format
const consoleLogFormat = format.printf((log: any): string => {
  const { timestamp, level, message, label, ...rest } = log;

  // if label is set, add it to the log message
  if (label) {
    return `[${timestamp}] [${level?.toUpperCase()}]: [${label}] - ${message} ${
      Object.keys(rest).length ? JSON.stringify(rest) : ''
    }`;
  }

  return `[${timestamp}] [${level?.toUpperCase()}]: ${message} ${Object.keys(rest).length ? JSON.stringify(rest) : ''}`;
});

// Console transport configuration
const consoleTransport = new winston.transports.Console({
  level: LEVEL,
  format: winston.format.combine(consoleLogFormat, winston.format.colorize({ all: true })),
});
/* ---------------------------------------- */

export const getLogger = (label: string) => {
  return winston.createLogger({
    transports: [consoleTransport, fileTransport],
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

//* configure logger with label
const logger = winston.createLogger({
  transports: [consoleTransport, fileTransport],
  levels: winston.config.npm.levels,
  defaultMeta: { service },
  format: winston.format.combine(
    winston.format.timestamp({ format: TIMESTAMP_FORMAT }),
    winston.format.errors({ stack: true }),
  ),
});

export default logger;
