const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./middleware/login');

// controllers
const { BannersController } = require('../controllers');

router.get('/', isLoggedIn, BannersController.getBanners);
router.post('/', isLoggedIn, BannersController.editBanners);

module.exports = router;