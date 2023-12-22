const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
  name: String,
  gender: String,
  dob: Date,
  bio: String,
});

const Actor = mongoose.model('Actor', actorSchema);

module.exports = Actor;
