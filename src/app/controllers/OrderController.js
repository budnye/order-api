import Order from '../models/Order';
import OrderProduct from '../models/OrderProduct';
import axios from 'axios';
class OrderController {
  async index(req, res) {
    const orders = await Order.findAll();
    orders.map(order => {
      axios
        .get(`http://localhost:3000/clients/${order.clientId}`)
        .then(response => {
          console.log(response.data.name);
          console.log(order.id);
          order.id = 0;
          console.log(order.id);
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    });


    return res.json(orders);
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