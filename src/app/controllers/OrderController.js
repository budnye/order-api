import Order from '../models/Order';
import OrderProduct from '../models/OrderProduct';
import OrderService from '../services/OrderService';
class OrderController {
  test() {
    return 'abc';
  }

  async index(req, res) {
    try {
      const orders = await Order.findAll({ raw: true });
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


}

export default new OrderController();