const express = require('express');
const cors = require('cors');

const logger = require('./utils/logger');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example: log every request
app.use((req, res, next) => {
	logger.info(`${req.method} ${req.url}`);
	next();
});

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res) => {
	res.status(404).json({ error: 'Not Found' });
});

// Global error handler (must be last)
app.use(errorHandler);

module.exports = app;