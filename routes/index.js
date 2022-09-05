const { Router } = require("express");
const { getTodos, postTodos } = require("../controllers/todos");
const { loginUser, postUser } = require("../controllers/user");
const getLoginUser = require("../middlewares/jwt");
const serverRoutes = Router();

serverRoutes.get("/todos", getLoginUser, getTodos);
serverRoutes.post("/todos", getLoginUser, postTodos);
serverRoutes.post("/login", loginUser);
serverRoutes.post("/singin", postUser);

module.exports = serverRoutes;
