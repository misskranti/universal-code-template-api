const express = require('express');
const templateRoutes = require('./routes/templateRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1', templateRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal server error',
    details: 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    details: `Route ${req.method} ${req.path} not found`
  });
});

module.exports = app;