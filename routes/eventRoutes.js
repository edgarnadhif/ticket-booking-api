// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET semua event
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST tambah event baru
router.post('/', async (req, res) => {
  const { name, location, date, price, ticketsAvailable } = req.body;

  const newEvent = new Event({
    name,
    location,
    date,
    price,
    ticketsAvailable
  });

  try {
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
