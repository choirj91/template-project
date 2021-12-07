const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./middleware/login');

// controllers
const { FiltersController } = require('../controllers');

router.use(isLoggedIn);
router.get('/all',  FiltersController.allFilters);

module.exports = router;