const express = require('express');

const authCtrl = require('./../controllers/auth.controller');

const { validateSignup, validateLogin, validatePasswordReset } = require('./../validations/auth.validation');

const router = express.Router();

// Public routes
router.post('/register', validateSignup, authCtrl.register);
router.post('/login', validateLogin, authCtrl.login);
router.post('/reset-password', validatePasswordReset, authCtrl.resetPassword);
router.post('/refresh-token', authCtrl.refreshToken);

module.exports = router;