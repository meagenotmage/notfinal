const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const announcementsRoutes = require('./routes/announcements');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

app.use('/api/announcements', announcementsRoutes);

app.get('/', (req, res) => {
  res.send('API is working');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
