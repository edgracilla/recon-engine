require('express-async-errors');

const cors = require('cors');
const xss = require('xss-clean');
const helmet = require('helmet');
const express = require('express');
const compression = require('compression');
const expressPino = require('express-pino-logger');

const logicAbc = require('recon-logic-abc');

const config = require('./config');
const logger = require('./logger');
const apiUtil = require('./api-utils');
const { name, version } = require('../package.json');

const app = express();

logicAbc.bind({
  logger,
  config,
});

app.use(expressPino({
  logger,
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
      remoteAddress: req.remoteAddress,
      remotePort: req.remotePort,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
    err: (err) => ({
      type: err.type,
      message: err.message,
    }),
  },
}));

app.use(cors());
app.options('*', cors());

app.use(xss());
app.use(helmet());
app.use(compression());
app.use(express.json());

app.use(express.urlencoded({
  extended: true,
}));

app.get('/', (req, res) => {
  res.status(200).send({ name, version });
});

app.use('/logic-abc', logicAbc.router);

app.use('*', (req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: 'Nof Found!',
  });
});

app.use(apiUtil.errHandler);

module.exports = app;
