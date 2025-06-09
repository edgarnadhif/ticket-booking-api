const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/events', eventRoutes); // route untuk event
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
  res.send('🎫 Ticket Booking API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
