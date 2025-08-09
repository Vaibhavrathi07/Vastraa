// /index.js
const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');


// Import routes
const userRouter = require('./route/user.route');
const productRouter = require('./route/ProductRoute');

const app = express();

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Middleware
app.use(cors({
  origin: [
    process.env.CLIENT_URL,
    'http://localhost:5173',
    'http://localhost:5174'
  ].filter(Boolean), 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.get('/api/test', (req, res) => {
  res.json({ 
    status: 'Backend is working!',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    time: new Date().toISOString()
  });
});
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/user', userRouter);
app.use('/api/products', productRouter);

// Error Handling Middleware
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('An error occurred:', err);

  

  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      error: 'Validation error',
      details: err.message 
    });
  }
  
  res.status(err.status || 500).json({ 
    error: 'Internal server error',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
