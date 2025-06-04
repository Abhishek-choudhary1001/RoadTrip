const express = require('express');
const mongoose = require('mongoose');
const locationRoutes = require('./routes/locationRoutes');
const roadTripRoutes = require('./routes/roadTripRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
require('dotenv').config();
// Import middleware
const auth = require('./middleware/auth');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Custom logging middleware
app.use(logger);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  // Mongoose 6+ does not require useNewUrlParser or useUnifiedTopology, but including for compatibility
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Use the routes
app.use('/api/locations', locationRoutes);
app.use('/api/roadtrips', auth, roadTripRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);

// Error handling middleware (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
