const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./middleware/login');

// controllers
const { NoticesController } = require('../controllers');

router.use(isLoggedIn);
router.get('/',  NoticesController.getNotices);
router.post('/',  NoticesController.addNotices);
router.get('/:id',  NoticesController.getNoticeDetail);
router.delete('/:id',  NoticesController.removeNotice);
router.post('/:id',  NoticesController.editNotice);

module.exports = router;