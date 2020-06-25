import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        clientId: Sequelize.INTEGER,
        dueDate: Sequelize.DATE,
        isCanceled: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  };

}

export default Order;