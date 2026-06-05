const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('mongo-sanitize');

const { general, auth, slowDown } = require('./config/rateLimiter');

const app = express();

// --- Security headers
app.use(helmet());

// --- CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// --- Body parsing
app.use(express.json({ limit: '10kb' })); // prevents huge payload attacks

// --- NoSQL injection sanitization
app.use((req, res, next) => {
  req.body   = mongoSanitize(req.body);
  req.params = mongoSanitize(req.params);
  req.query  = mongoSanitize(req.query);
  next();
});

// --- Rate limiting
app.use('/api/', general);
app.use('/api/users/login',    slowDown, auth);
app.use('/api/users/register', auth);

// --- Routes
app.use('/api/users',        require('./routes/userRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));

// --- Error handler (hides stack trace in production)
app.use((err, req, res, next) => {
  const status  = err.status || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'Something went wrong'
    : err.message;
  res.status(status).json({ message });
});

module.exports = app;
