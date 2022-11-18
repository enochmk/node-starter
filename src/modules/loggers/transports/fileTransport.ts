import rtracer from 'cls-rtracer';
import winston, { format } from 'winston';
import 'winston-daily-rotate-file';

const config = {
  console: true,
  service: 'Starter-service',
  level: `${process.env.LOG_LEVEL || 'info'}`,
  dirname: `${process.env.LOG_DIRECTORY || 'logs'}`,
  datePattern: 'YYYY-MM-DD',
};

const datePattern = config.datePattern;
const dirname = config.dirname;
const level = config.level;

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
