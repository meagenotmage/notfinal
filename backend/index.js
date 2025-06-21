const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const announcementsRoutes = require('./routes/announcements');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/announcements', announcementsRoutes);

app.get('/', (req, res) => {
  res.send('🎉 API is working');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
