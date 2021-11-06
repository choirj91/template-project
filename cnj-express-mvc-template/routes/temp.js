const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./middleware/login');

// controllers
const { TempController } = require('../controllers');

// router.use(isLoggedIn);
// router.get('/', isLoggedIn, TempController.getTempValue);
router.get('/', TempController.getTempValue);

module.exports = router;