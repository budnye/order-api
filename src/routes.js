import { Router } from 'express';
import OrderController from './app/controllers/OrderController';

const routes = new Router();

routes.get('/orders', OrderController.store);

export default routes;
