
  
const express = require('express');
const mongoose = require('mongoose');
const actorRoutes = require('./routes/actorRoutes');
const producerRoutes = require('./routes/producerRoutes');
const movieRoutes = require('./routes/movieRoutes');
const cors = require('cors');

const app = express();
app.use(cors());

// Connect to MongoDB with database name
mongoose.connect('mongodb+srv://rahulrajenderan96:rahulrajenderan96@cluster0.sq5vsik.mongodb.net/?retryWrites=true&w=majority', {
 useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/actors', actorRoutes);
app.use('/producer', producerRoutes);
app.use('/movies', movieRoutes);

// Server setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
