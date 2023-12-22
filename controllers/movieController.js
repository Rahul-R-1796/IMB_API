// controllers/movieController.js
const Movie = require('../models/movie');
const Actor = require('../models/actor');
const Producer = require('../models/producer');

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate('producer').populate('actors');
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createMovie = async (req, res) => {
  const { name, yearOfRelease, plot, poster, producer: producerId, actors: actorIds } = req.body;

  try {
    // Check if all actors exist in the database
    const existingActors = await Actor.find({ _id: { $in: actorIds } });
    if (existingActors.length !== actorIds.length) {
      return res.status(400).json({ message: 'One or more actors are not in the list' });
    }

    // Check if the producer exists in the database
    const existingProducer = await Producer.findById(producerId);
    if (!existingProducer) {
      return res.status(400).json({ message: 'Producer not found in the list' });
    }

    const movie = new Movie({
      name,
      yearOfRelease,
      plot,
      poster,
      producer: producerId,
      actors: actorIds,
      // other movie fields
    });

    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// delete Function
exports.deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateMovie = async (req, res) => {
  const { id } = req.params;
  const { name, yearOfRelease, plot, poster, producer: producerId, actors: actorIds } = req.body;

  try {
    let movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Check if all actors exist in the database 
    const existingActors = await Actor.find({ _id: { $in: actorIds } });
    if (existingActors.length !== actorIds.length) {
      return res.status(400).json({ message: 'One or more actors are not in the list' });
    }

    // Check if the producer exists in the database
    const existingProducer = await Producer.findById(producerId);
    if (!existingProducer) {
      return res.status(400).json({ message: 'Producer not found in the list' });
    }

    movie.name = name;
    movie.yearOfRelease = yearOfRelease;
    movie.plot = plot;
    movie.poster = poster;
    movie.producer = producerId;
    movie.actors = actorIds;

    // Update other movie fields as needed

    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

