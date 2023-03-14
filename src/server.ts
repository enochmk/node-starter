import config from 'config';
import http from 'http';
import express, { Express } from 'express';
import configureMiddleware from './app/configureMiddleware';
import configureSocket from './app/configureSocket';
import { getLogger } from './libs/loggers';

const PORT = config.get('port') as number;
const NODE_ENV = config.get('env') as string;

// initialize node application
const app: Express = express();
const logger = getLogger({ label: 'Server' });

const onListening = () => {
  logger.info(`Server listening in mode: ${NODE_ENV} on port: ${PORT}`);
};

async function startServer() {
  // configure middlewaresx
  configureMiddleware(app);
  const server = http.createServer(app);

  // configure socket
  configureSocket(server);

  // listen to server
  server.on('listening', onListening);

  // initiate server
  server.listen(PORT);
}

startServer();
