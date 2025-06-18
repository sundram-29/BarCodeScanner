// Importing required modules
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Scan from './models/Scan.js'; // Importing Scan model

const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Middleware
app.use(cors());               // Enable CORS for cross-origin requests
app.use(express.json());       // Parse incoming JSON data

// Route to save scanned barcode data
app.post('/scan', async (req, res) => {
  const { barcode, level } = req.body;

  try {
    const scan = new Scan({ barcode, level }); // Save level too
    await scan.save();
    res.json({ message: 'Saved', scan });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save scan data' });
  }
});

// Route to retrieve all scanned data (latest first)
app.get('/scans', async (req, res) => {
  try {
    const scans = await Scan.find().sort({ scannedAt: -1 }); // Get all scans
    res.json(scans);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scans' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
