import axios from 'axios';
import OrderProduct from '../models/OrderProduct'

class OrderService {

  async processOrder(order) {

    async function processProduct(product) {
      try {
        const responseProduct = await axios.get(`http://localhost:3000/product/${product.productId}`);
        product = responseProduct.data;
        return product;
      } catch (error) {
        throw new Error('Cant reach products api error: ' + error);
      }

    }

    try {
      const responseClient = await axios.get(`http://localhost:3000/clients/${order.clientId}`);
      order['client'] = responseClient.data;
      const orderProducts = await OrderProduct.findAll({ raw: true, where: { orderId: order.id } });
      const products = await Promise.all(orderProducts.map(processProduct))
      order['products'] = products

      return order;
    } catch (error) {
      throw new Error('Cant reach client api error: ' + error);
    }
  }

}

export default new OrderService();