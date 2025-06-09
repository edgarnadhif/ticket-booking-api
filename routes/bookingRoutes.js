// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Event = require('../models/Event');

// POST buat booking
router.post('/', async (req, res) => {
  const { eventId, name, email, quantity } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event tidak ditemukan' });

    if (event.ticketsAvailable < quantity) {
      return res.status(400).json({ message: 'Tiket tidak cukup tersedia' });
    }

    const totalPrice = event.price * quantity;

    // Simpan booking
    const booking = new Booking({
      eventId,
      name,
      email,
      quantity,
      totalPrice
    });

    await booking.save();

    // Kurangi tiket yang tersedia
    event.ticketsAvailable -= quantity;
    await event.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET semua booking
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('eventId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
