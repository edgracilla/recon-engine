const logger = require('./logger');

// eslint-disable-next-line no-unused-vars
const errHandler = (err, req, res, next) => {
  const { statusCode, message } = err;

  const resp = {
    statusCode: statusCode || 500,
    message: statusCode ? message : 'Internal Server Error!',
  };

  logger.error(err);

  res
    .status(resp.statusCode)
    .send(resp);
};

module.exports = {
  errHandler,
};
