const logger = require('./logger');
const { name, version } = require('../../package.json');

// eslint-disable-next-line no-unused-vars
const errHandler = (err, req, res, next) => {
  const { statusCode, message } = err;

  const resp = {
    statusCode: statusCode || 500,
    message: statusCode ? message : 'Internal Server Error!',
  };

  if (!statusCode) logger.error(err);
  res.status(resp.statusCode).send(resp);
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: 'Nof Found!',
  });
};

const rootHandler = (req, res) => {
  res.status(200).send({ name, version });
};

module.exports = {
  notFoundHandler,
  rootHandler,
  errHandler,
};
