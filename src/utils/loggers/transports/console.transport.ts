import winston, { format } from 'winston';
import config from 'config';

const LEVEL = config.get('logger.level') as string;

// log format
const logFormat = format.printf((log: any): string => {
  const { timestamp, level, message, service, label, ...rest } = log;
  return `[${timestamp}] [${level?.toUpperCase()}]: [${label || 'app'}] - ${message} ${
    Object.keys(rest).length ? JSON.stringify(rest) : ''
  }`;
});

// File transport configuration
const consoleTransaport = new winston.transports.Console({
  level: LEVEL,
  format: winston.format.combine(logFormat, winston.format.colorize({ all: true })),
});

export default consoleTransaport;
