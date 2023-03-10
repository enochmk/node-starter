import express, { Application } from 'express';
import config from 'config';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';
// import requestID, { Options } from 'express-request-id';
import routes from '../routes';

const corOptions = config.get('corsOptions') as object;

// configure middleware
const configureMiddleware = (app: Application) => {
  app.use(morgan('dev'));
  app.use(cors(corOptions));
  app.use(express.json());
  app.use(helmet());
  app.use(hpp());
  // app.use(requestID());
  app.use('/api', routes);
};

export default configureMiddleware;
