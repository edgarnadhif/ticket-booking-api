// controllers/bookingController.js
const Booking = require('../models/Booking');
const Event = require('../models/Event');

exports.createBooking = async (req, res) => {
  const { eventId, name, email, quantity } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event tidak ditemukan' });

    if (event.ticketsAvailable < quantity) {
      return res.status(400).json({ message: 'Tiket tidak cukup tersedia' });
    }

    const totalPrice = event.price * quantity;

    const booking = new Booking({ eventId, name, email, quantity, totalPrice });
    await booking.save();

    event.ticketsAvailable -= quantity;
    await event.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('eventId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
