const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const announcementsRoutes = require('./routes/announcements');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://meydj:Koqtn1bNPPanBD9q@cluster0.58b0ew2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Routes
app.use('/api/announcements', announcementsRoutes);

app.get('/', (req, res) => {
  res.send('API is working');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
