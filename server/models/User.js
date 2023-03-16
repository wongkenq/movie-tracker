const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  fav: {
    _id: false,
    title: String,
    id: Number,
    backdrop_path: String,
    poster_path: String,
    overview: String,
    // credits: Object,
    // release_dates: Object,
  },
});

module.exports = mongoose.model('Users', UserSchema);
