import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres',
  username: 'root',
  password: "root",
  host: "localhost",
  port: 5432,
  database: "my_db"
});

export default sequelize;
