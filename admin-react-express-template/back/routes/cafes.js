const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./middleware/login');

// controllers
const { CafesController } = require('../controllers');

router.use(isLoggedIn);
router.get('/list',  CafesController.cafesList);
router.post('/',  CafesController.newCafes);
router.post('/display',  CafesController.cafeDisplay);
router.get('/:cafeNumber',  CafesController.cafesInfo);
router.get('/:cafeNumber/name',  CafesController.cafesSimpleInfo);
router.post('/:cafeNumber',  CafesController.cafeEdit);
router.delete('/:cafeNumber',  CafesController.cafeDelete);


module.exports = router;