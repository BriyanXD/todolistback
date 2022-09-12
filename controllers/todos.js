const todos = require("../models/todo");

const getTodos = async (req, res) => {
  const { userId } = req.params;
  try {
    const allTodos = await todos.findAll({
      where: { userId, complete: false },
      attributes: ["id", "title", "description", "complete"],
    });
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
      attributes: ["id", "title", "description", "complete"],
    });
    res.send(newTodo[0]);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const putTodos = async (req, res) => {
  const { id, newDescription, newTitle } = req.body;
  try {
    const findTodo = await todos.findByPk(id);

    if (id && newDescription && newTitle) {
      await findTodo.update({ title: newTitle, description: newDescription });
      findTodo.title = newTitle;
      findTodo.description = newDescription;

      return res.send(findTodo);
    } else {
      await findTodo.update({ complete: true });
      findTodo.complete = true;

      return res.send(findTodo);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};
const deleteTodos = async (req, res) => {};
module.exports = { getTodos, postTodos, putTodos };
