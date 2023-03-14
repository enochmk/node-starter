import http from 'http';
import { Server, Socket } from 'socket.io';
import { getLogger } from '../libs/loggers';

const logger = getLogger({ label: 'Socket' });

const configureSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: { origin: '*' },
  });

  io.on('connection', (socket: Socket) => {
    logger.info('Socket connected!');
    socket.emit('connected');
  });

  logger.info('Configured Socket!');
};

export default configureSocket;
