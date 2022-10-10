import dotenv from 'dotenv';
dotenv.config()
import Sequelize from "sequelize";
const sequelize = new Sequelize(
  "testproject",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 5000,
      idle: 1000,
    },
  }
);

export { sequelize };
