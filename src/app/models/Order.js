import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        clientId: Sequelize.INTEGER,
        OrderProducstId: Sequelize.INTEGER,
        dueDate: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  };

}

export default Order;