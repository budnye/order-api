import * as Yup from 'yup';
import Order from '../models/Order';
import OrderProduct from '../models/OrderProduct';
import OrderService from '../services/OrderService';

class OrderController {

  async index(req, res) {
    try {
      const orders = await Order.findAll({
        raw: true, where: { isCanceled: false }, order: [
          ['id', 'DESC']
        ]
      });
      let ordersList = await Promise.all(
        orders.map(OrderService.processOrder)
      )
      return res.json(ordersList);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Detail: ' + error });
    }
  }

  async get(req, res) {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(400).json({ error: 'Invalid order id.' })
    }
    const processedOrder = await OrderService.processOrder(order);
    return res.status(200).json(processedOrder);
  }
  async listCanceled(req, res) {
    try {
      const orders = await Order.findAll({ raw: true, where: { isCanceled: true } });
      let ordersList = await Promise.all(
        orders.map(OrderService.processOrder)
      )
      return res.json(ordersList);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Detail: ' + error });
    }
  }
  async store(req, res) {
    // Valida os dados do body request
    const schema = Yup.object().shape({
      clientId: Yup.number().integer().required(),
      dueDate: Yup.date()
        .required(),
      products: Yup.array()
        .required(),
      isCanceled: Yup.boolean()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    // Salva o registro do pedido
    const { id, clientId, dueDate } = await Order.create(req.body);
    const products = req.body.products;
    products.map(product => {
      product.orderId = id;
      OrderProduct.create(product);
    });

    return res.status(201).json({
      id,
      clientId,
      dueDate,
      products,
    });
  }

  async cancel(req, res) {
    const order = await Order.findByPk(req.params.id, { raw: true });

    if (!order) {
      return res.status(404).json({ error: 'Invalid order id.' });
    }
    const response = await Order.update({ isCanceled: true }, { where: { id: order.id } });
    console.log(response);
    if (response == 1) {
      return res.status(200).json({ message: 'The order was canceled.' });
    } else {
      return res.status(500).json({ error: 'The order wasnt canceled.' });
    }
  }

}

export default new OrderController();