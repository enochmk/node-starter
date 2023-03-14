import winston, { format } from 'winston';
import config from 'config';

const LEVEL = config.get('logger.level') as string;

// log format
const logFormat = format.printf((log: any): string => {
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
const consoleTransaport = new winston.transports.Console({
  level: LEVEL,
  format: winston.format.combine(logFormat, winston.format.colorize({ all: true })),
});

export default consoleTransaport;
