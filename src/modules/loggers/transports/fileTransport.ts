import config from 'config';
import rtracer from 'cls-rtracer';
import winston, { format } from 'winston';
import 'winston-daily-rotate-file';

const datePattern = config.get('logger.datePattern') as string;
const dirname = config.get('logger.dirname') as string;
const level = config.get('logger.level') as string;

// log format
const logFormat = format.printf((log: any): string => {
  const requestID = rtracer.id();

  const schema: any = {
    timestamp: log.timestamp,
    requestID: requestID,
    service: log?.service,
    level: log.level,
    message: log.message,
    context: {},
  };

  return JSON.stringify(schema);
});

// File transport configuration
const fileTransport = new winston.transports.DailyRotateFile({
  level,
  datePattern,
  dirname,
  filename: '%DATE%.log',
  format: winston.format.combine(logFormat),
});

export default fileTransport;
