import express from 'express';
import routes from './routes';
import morgan from 'morgan';
import cors from 'cors';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(morgan('dev'));
  }

  routes() {
    this.server.use(routes);
  }
  exceptionHandler() {
    this.server.use((req, res, next) => {
      const error = new Error('Not found');
      error.status = 404;
      next(error);
    });

    this.server.use((error, req, res, next) => {
      res.status(error.status || 500);
      res.json({
        error: {
          message: error.message
        }
      });
    });
  }
}
export default new App().server;
