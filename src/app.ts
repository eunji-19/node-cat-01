/**
 * 고양이 데이터 모킹하기
 */
import * as express from 'express';
import catsRouter from './cats/cats.route';

class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRoute() {
    this.app.use(catsRouter);
  }

  private setMiddleware() {
    /**
     * Logging Middleware
     */
    this.app.use((req, res, next) => {
      console.log('This is logging middleware');
      next();
    });

    /**
     * json Middleware
     */
    this.app.use(express.json());
    this.setRoute();

    /**
     * 404 Error Middleware
     */
    this.app.use((req, res, next) => {
      console.log('This is error middleware');
      res.send({ error: '404 Not Found error' });
    });
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(8000, () => {
      console.log('server is on...');
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();
