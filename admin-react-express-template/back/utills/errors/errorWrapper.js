const moment = require('moment');
const { validationResult } = require('express-validator');
const errorGenerator = require('./errorGenerator');
const errorMessages = require('./errorMessages');
const { isEmpty } = require('../stringUtil');

const errorWrapper = (controller) => async (req, res, next) => {
  try {
    const nowDate = moment().format("YYYY-MM-DD_HH:mm:ss:SSSSS");
    const { device_id, version, platform, app_version } = req.headers;
    const { user_number } = req.body;
    const deviceInfo = "user_number=" + (isEmpty(user_number) ? 'visitor' : user_number) + '|' + "platform=" + platform + '|' + "version=" + version + "|" + "app_version=" + app_version + "|" + "device_id=" + device_id + "|";
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.error(nowDate + ' - ' + deviceInfo + '\n[errorWrapper-validationResult Error!]', errors);
        errorGenerator({ statusCode: 500, message: '앗! 문제가 발생했어요.\n잠시 후 다시 시도해주세요.' });
      }
      await controller(req, res, next);
    } catch (err) {
      console.error(nowDate + ' - ' + deviceInfo + '\n[errorWrapper]', err);
      if (isEmpty(errorMessages[err.statusCode])) next(new Error('앗! 문제가 발생했어요.\n잠시 후 다시 시도해주세요.'));
      else next(err);
    }
  } catch (error) {
    console.error('[errorWrapper] - ' + error);
    next(new Error('앗! 문제가 발생했어요.\n잠시 후 다시 시도해주세요.'));
  }
}

module.exports = errorWrapper