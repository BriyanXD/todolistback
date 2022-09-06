const express = require("express");
const consoleRequest = require("morgan");
const dotenv = require("dotenv");
const sequelize = require("./db");
dotenv.config();

const Todo = require("./models/todo");
const User = require("./models/user");

const serverRoutes = require("./routes/index");

const PORT = process.env.PORT || 3002;
const server = express();

server.use(consoleRequest("dev"));
server.use(express.json());
server.use(express.text());
server.use("/", serverRoutes);

Todo.belongsTo(User);
User.hasMany(Todo);

server.listen(PORT, () => {
  console.log(`Server up on http://localhost:${PORT}`);
  sequelize.sync({ force: false }).then(() => {
    console.log("DB sync on models");
  });
});
