import config from 'config';
import rtracer from 'cls-rtracer';
import winston, { format } from 'winston';
import 'winston-daily-rotate-file';

const dirname = config.get('logger.dirname') as string;
const LEVEL = config.get('logger.level') as string;

// log format
const logFormat = format.printf((log: any): string => {
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
  format: winston.format.combine(logFormat),
});

export default fileTransport;
