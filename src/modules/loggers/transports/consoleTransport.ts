import winston, { format } from 'winston';

const config = {
  console: true,
  service: 'Starter-service',
  level: `${process.env.LOG_LEVEL || 'info'}`,
  dirname: `${process.env.LOG_DIRECTORY || 'logs'}`,
  datePattern: 'YYYY-MM-DD',
};

const level = config.service;

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
