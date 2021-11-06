const DEFAULT_HTTP_STATUS_MESSAGES = require('./errorMessages');

const errorGenerator = ({ message = '', statusCode = 500, value = '' }) => {
  const err = new Error((message || DEFAULT_HTTP_STATUS_MESSAGES[statusCode]) + '\n' + value);
  err.statusCode = statusCode;
  throw err;
}

module.exports = errorGenerator;