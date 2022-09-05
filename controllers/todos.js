const todos = require("../models/todo");
const getTodos = async (req, res) => {
  const { userId } = req.body;
  try {
    const allTodos = await todos.findAll({ where: userId, complete: false });
    res.send(allTodos);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
const postTodos = async (req, res) => {
  const { title, description, userId } = req.body;
  try {
    const newTodo = await todos.findOrCreate({
      where: { title, description, userId },
    });
    res.send(newTodo[0]);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const putTodos = async (req, res) => {};
const deleteTodos = async (req, res) => {};
module.exports = { getTodos, postTodos };
