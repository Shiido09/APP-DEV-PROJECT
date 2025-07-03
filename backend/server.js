const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load .env again just in case
const connectDB = require('./config/database'); // Import the database connection

// Import routes
const userRoutes = require('./routes/userRoutes');

connectDB(); // Connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('HarvestConnect API is working!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
