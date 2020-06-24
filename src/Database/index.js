import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Order from '../app/models/Order';
import OrderProduct from '../app/models/OrderProduct';

//Carrega os models
const models = [Order, OrderProduct];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();