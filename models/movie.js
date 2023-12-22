// models/movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  yearOfRelease: Number,
  plot: String,
  poster: String,
  producer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producer',
    required: true
  },
  actors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Actor',
 
  }],
  // other movie fields
});

module.exports = mongoose.model('Movie', movieSchema);
