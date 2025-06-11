// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const locationRoutes = require('./routes/locationRoutes');
const roadTripRoutes = require('./routes/roadTripRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const auth = require('./middleware/auth');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();








// Middleware
app.use(cors()); // Enable CORS if frontend is separate
app.use(express.json());
app.use(logger);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/roadtrips', auth, roadTripRoutes); // Protected
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);

// 404 handler (optional)
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// Error handling middleware (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
