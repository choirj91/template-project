const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./middleware/login');

// controllers
const { FilesController } = require('../controllers');

router.use(isLoggedIn);
router.post('/image',  FilesController.uploadImageFile);
router.post('/remove-image',  FilesController.deleteImageFile);
router.post('/admin',  FilesController.uploadAdminProfile);

module.exports = router;