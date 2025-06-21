const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const announcementRoutes = require('./routes/announcements'); // ✅ Add this

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/announcements', require('./routes/announcements'));
 // ✅ Add this

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mycollege', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



