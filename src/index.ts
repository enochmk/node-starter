import dotenv from 'dotenv';
import express, { Express } from 'express';

import routes from './routes';

// provide access to environmental variables
dotenv.config();

// initialize node application
const app: Express = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// configure middlewares
app.use(routes);

// start server
app.listen(PORT, () => {
  console.log(`Server running in mode: ${NODE_ENV} on port: ${PORT}`);
});
