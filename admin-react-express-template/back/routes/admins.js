const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./middleware/login');

// controllers
const { AdminsController } = require('../controllers');

router.get('/', isLoggedIn, AdminsController.adminsInfo);
router.get('/list', isLoggedIn, AdminsController.adminsList);
router.get('/account', isLoggedIn, AdminsController.adminsProfile);
router.post('/', AdminsController.adminsRegister);
router.post('/profile', isLoggedIn, AdminsController.adminsEditProfile);
router.post('/password', isLoggedIn, AdminsController.adminsChangePassword);
router.post('/login', AdminsController.adminsLogin);
router.post('/logout', AdminsController.adminsLogout);
router.post('/status', AdminsController.adminsChangeStatus);
router.post('/grade', AdminsController.adminsChangeGrade);

module.exports = router;