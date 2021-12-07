const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./middleware/login');

// controllers
const { MagazinesController } = require('../controllers');

router.get('/', isLoggedIn, MagazinesController.getMagazines);
router.post('/:magazineNumber/display', isLoggedIn, MagazinesController.displayMagazine);
router.post('/', isLoggedIn, MagazinesController.addMagazines);
router.put('/:magazineNumber', isLoggedIn, MagazinesController.editMagazines);
router.get('/:magazineNumber',  MagazinesController.getMagazineData);
router.delete('/:magazineNumber',  MagazinesController.deleteMagazine);

module.exports = router;