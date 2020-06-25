import { Router } from 'express';
import OrderController from './app/controllers/OrderController';

const routes = new Router();

routes.post('/orders', OrderController.store);

routes.get('/orders', OrderController.index);

routes.get('/orders/canceled', OrderController.listCanceled);

routes.delete('/orders/:id', OrderController.cancel);

export default routes;
