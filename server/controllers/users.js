const User = require('../models/User');

module.exports = {
  getUser: async (req, res) => {
    User.findOne({ email: req.params.id }, (err, data) => {
      if (!err) {
        res.json(data);
      } else {
        res.status(404).json({ message: 'User not found', error: err.message });
      }
    });
  },
  createUser: async (req, res) => {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    });

    const existingUser = await User.exists({
      email: req.body.email,
    });

    if (existingUser) {
      console.log(`${existingUser} already exists`);
      return res.status(400).send({ message: 'User already exists.' });
    }

    await user
      .save()
      .then((data) => res.json({ message: 'User added: ', data }))
      .catch((err) => console.log(err));
  },
  addFav: async (req, res) => {
    await User.updateOne(
      { _id: req.params.id },
      {
        $addToSet: {
          fav: {
            title: req.body.fav.title,
            id: req.body.fav.id,
            backdrop_path: req.body.fav.backdrop_path,
            poster_path: req.body.fav.poster_path,
            overview: req.body.fav.overview,
            // credits: req.body.fav.credits,
            // release_dates: req.body.fav.release_dates,
          },
        },
      },
      { _id: false }
    )
      .then((data) => res.json({ message: 'Added favorite', data }))
      .catch((err) =>
        res
          .status(400)
          .json({ message: 'Failed to add fav', error: err.message })
      );
  },
  delFav: async (req, res) => {
    await User.updateOne(
      { _id: req.params.id },
      {
        $pull: { fav: { id: req.body.id } },
      }
    )
      .then((data) => res.json({ message: 'Deleted favorite', data }))
      .catch((err) =>
        res
          .status(400)
          .json({ message: 'Failed to delete fav', error: err.message })
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
