const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  //   createdBy: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'User',
  //   },
});

module.exports = mongoose.model('Todo', TodoSchema);
