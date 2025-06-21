const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

// Get all announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new announcement
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  try {
    const newAnnounce = new Announcement({ title, description });
    await newAnnounce.save();
    res.status(201).json(newAnnounce);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/announcements/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await Announcement.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});
module.exports = router;
