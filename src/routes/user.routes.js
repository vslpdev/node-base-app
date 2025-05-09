// src/routes/user.routes.js
const express = require('express');
const userCtrl = require('../controllers/user.controller');

const authMiddleware = require('../middlewares/auth.middleware');

const { authorizeRoles } = require('../middlewares/auth.middleware');

const router = express.Router();

// Any logged-in user can get their profile
router.get('/profile', authMiddleware.verifyToken, userCtrl.getProfile);

// Update own profile
router.put('/profile', authMiddleware.verifyToken, userCtrl.updateProfile);

// Admin-only routes (example)
router.get('/', authMiddleware.verifyToken, authorizeRoles('admin'), userCtrl.getAllUsers);

module.exports = router;