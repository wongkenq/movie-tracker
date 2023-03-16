const Todo = require('../models/Todo');

module.exports = {
  getAllTodos: async (req, res) => {
    await Todo.find()
      .then((todo) => res.json(todo))
      .catch((err) =>
        res.status(404).json({ message: 'Todo not found', error: err.message })
      );
  },
  createTodo: async (req, res) => {
    try {
      const todo = new Todo({
        text: req.body.text,
      });
      await todo
        .save()
        .then((data) => res.json({ message: 'Todo added: ', data }));
    } catch (error) {
      console.log(error);
    }
  },
  updateTodo: async (req, res) => {
    await Todo.updateOne(
      { _id: req.params.id },
      { text: req.body.text, updatedAt: Date.now() }
    )
      .then((data) => res.json({ message: 'Todo updated', data }))
      .catch((err) =>
        res
          .status(400)
          .json({ message: 'Failed to update Todo', error: err.message })
      );
  },
  completeTodo: async (req, res) => {
    const todo = await Todo.updateOne(
      { _id: req.params.id },
      { complete: req.body.complete }
    )
      .then((data) => res.json({ message: 'Todo updated', data }))
      .catch((err) =>
        res
          .status(400)
          .json({ message: 'Failed to update Todo', error: err.message })
      );

    console.log(todo.body);
  },
  deleteTodo: async (req, res) => {
    await Todo.deleteOne({ _id: req.params.id })
      .then((data) => res.json({ message: 'Deleted one Todo', data }))
      .catch((err) =>
        res
          .status(404)
          .json({ message: 'Failed to delete todo', error: err.message })
      );
  },
};
