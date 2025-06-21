// backend/models/Announcement.js
const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Announcement', announcementSchema);
