const moment = require('moment');
const DEFAULT_HTTP_STATUS_MESSAGES = require('./errorMessages');

const generalErrorHandler = (err, req, res, next) => {
  const { message, statusCode } = err;
  const nowDate = moment().format("YYYY-MM-DD_HH:mm:ss:SSSSS");

  if(statusCode === 900 || statusCode === 999) {
    console.log(nowDate + ' - [generalErrorHandler] :', err.message);
  }
  else console.error(nowDate + ' - [generalErrorHandler] :', err.message);
  res.status(statusCode || 500).json({ message });
}

module.exports = generalErrorHandler;