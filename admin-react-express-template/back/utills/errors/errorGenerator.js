const DEFAULT_HTTP_STATUS_MESSAGES = require('./errorMessages');

const errorGenerator = ({ message = '', statusCode = 500, value = '' }) => {
  // const nowDate = moment().format("YYYY-MM-DD_HH:mm:ss:SSSSS");
  // if(err) console.error(nowDate + ' - [errorGenerator] ' + value, err);
  const err = new Error((message || DEFAULT_HTTP_STATUS_MESSAGES[statusCode]) + '\n' + value);
  err.statusCode = statusCode;
  throw err;
}

module.exports = errorGenerator;