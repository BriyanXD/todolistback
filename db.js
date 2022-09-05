const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const { USERDB, PASSDB, HOSTDB, PORTDB } = process.env;

const sequelize = new Sequelize(
  `postgres://${USERDB}:${PASSDB}@${HOSTDB}:${PORTDB}/todos`
);

module.exports = sequelize;
