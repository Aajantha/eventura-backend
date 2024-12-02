import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/events.js';
import venueRoutes from './routes/service.js';
import servicedash from './routes/servicedash.js';
import contactRoutes from './routes/contactRoutes.js';
import cartRoutes from './routes/cartRoutes.js'; // Import cart routes
// import hall from './routes/hall.js';
import paymentRoutes from './routes/Payments.js';

dotenv.config();  // Load environment variables
const app = express();
const PORT = process.env.PORT || 8000;

// Connect to the database
connectDB()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/venues', venueRoutes);
app.use('/servicedash', servicedash);
app.use('/api/contact', contactRoutes);
app.use('/api/cart', cartRoutes); // Use the cart routes

// app.use('/api/hall', hall); 

app.use('/api/payment', paymentRoutes);  // Your payment routes should use the stripe instance

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
