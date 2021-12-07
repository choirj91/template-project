const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./middleware/login');

// controllers
const { DashboardController } = require('../controllers');

router.get('/', isLoggedIn, DashboardController.dashboardData);

module.exports = router;