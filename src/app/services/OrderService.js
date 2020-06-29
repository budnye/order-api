import axios from 'axios';
import OrderProduct from '../models/OrderProduct'

class OrderService {

  async processOrder(order) {

    async function processProduct(product) {
      try {
        const responseProduct = await axios.get(`http://localhost:3000/products/${product.productId}`);
        const qnt = product.qnt;
        const { id, name, info, price } = responseProduct.data;
        return {
          id,
          name,
          info,
          price,
          qnt,
        };
      } catch (error) {
        throw new Error('Cant reach products api error: ' + error);
      }

    }

    try {
      const responseClient = await axios.get(`http://localhost:3000/clients/${order.clientId}`);
      const { id, name, email, birth } = responseClient.data;
      order['client'] = {
        id,
        name,
        email,
        birth,
      }
      const orderProducts = await OrderProduct.findAll({ raw: true, where: { orderId: order.id } });
      const products = await Promise.all(orderProducts.map(processProduct));
      order['products'] = products
      const orderId = order.id;
      const { dueDate, createdAt, client, isCanceled } = order;
      return {
        orderId,
        createdAt,
        dueDate,
        isCanceled,
        client,
        products,
      };
    } catch (error) {
      throw new Error('Cant reach client api. ' + error);
    }
  }

}

export default new OrderService();