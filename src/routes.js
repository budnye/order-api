import { Router } from 'express';
import OrderController from './app/controllers/OrderController';

const routes = new Router();

routes.post('/orders', OrderController.store);

routes.get('/orders', OrderController.index);

export default routes;
