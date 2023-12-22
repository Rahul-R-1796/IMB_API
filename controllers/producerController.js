const Producer = require('../models/producer');

// Controller functions
exports.getAllProducer = async (req, res) => {
  try {
    const producers = await Producer.find();
    res.json(producers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProducer = async (req, res) => {
    const { name, gender, dob, bio } = req.body;
    const producerDetails = new Producer({ name, gender, dob, bio });
  
    try {
      const newProducer = await producerDetails.save();
      res.status(201).json(newProducer);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };


  exports.updateProducer = async (req, res) => {
    const { id } = req.params;
  
    try {
      const producerUpdate = await Producer.findByIdAndUpdate(id, req.body, { new: true });
      if (!producerUpdate) {
        return res.status(404).json({ message: 'Producer Name not found' });
      }
      res.json(producerUpdate);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  exports.deleteProducer = async (req, res) => {
    const { id } = req.params;
  
    try {
      const ProducerList = await Producer.findByIdAndDelete(id);
      if (!ProducerList) {
        return res.status(404).json({ message: 'Producer not found' });
      }
      res.json({ message: 'Producer deleted' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  