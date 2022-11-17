import config from 'config';
import winston, { format } from 'winston';

const level = config.get('logger.level') as string;

// log format
const logFormat = format.printf((log: any): string => {
  const { timestamp, level, message, label } = log;
  return `[${timestamp}][${label}][${level}]: ${message}}`;
});

// File transport configuration
const consoleTransaport = new winston.transports.Console({
  level,
  format: winston.format.combine(logFormat, winston.format.colorize({ all: true })),
});

export default consoleTransaport;
