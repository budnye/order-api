import Sequelize, { Model } from 'sequelize';

class OrderProduct extends Model {
  static init(sequelize) {
    super.init(
      {
        orderId: Sequelize.INTEGER,
        productId: Sequelize.INTEGER,
        qnt: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  };

}

export default OrderProduct;