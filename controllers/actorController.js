const Actor = require('../models/actor');

// Controller functions
exports.getAllActors = async (req, res) => {
  try {
    const actors = await Actor.find();
    res.json(actors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createActor = async (req, res) => {
  const { name, gender, dob, bio } = req.body;
  const actor = new Actor({ name, gender, dob, bio });

  try {
    const newActor = await actor.save();
    res.status(201).json(newActor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateActor = async (req, res) => {
  const { id } = req.params;

  try {
    const actor = await Actor.findByIdAndUpdate(id, req.body, { new: true });
    if (!actor) {
      return res.status(404).json({ message: 'Actor not found' });
    }
    res.json(actor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteActor = async (req, res) => {
  const { id } = req.params;

  try {
    const actor = await Actor.findByIdAndDelete(id);
    if (!actor) {
      return res.status(404).json({ message: 'Actor not found' });
    }
    res.json({ message: 'Actor deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
