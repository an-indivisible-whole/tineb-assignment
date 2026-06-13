const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const candidateRoutes = require('./Routes/CandidateRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'Stakeholders'
})
  .then(() => console.log('✅ Successfully connected to MongoDB Atlas'))
  .catch(err => console.error('❌ Database connection error:', err));

// Mount the router at the root API prefix
// This results in: /api/candidates and /api/updateCandidate/:id
app.use('/api', candidateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});