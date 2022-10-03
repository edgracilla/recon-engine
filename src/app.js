const cors = require('cors');
const xss = require('xss-clean');
const helmet = require('helmet');
const express = require('express');
const compression = require('compression');
const expressPino = require('express-pino-logger');

const config = require('./config');
const logger = require('./logger');
const { name, version } = require('../package.json');

const app = express();

if (config.env !== 'test') {
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
    },
  }));
}

app.use(cors());
app.options('*', cors());

app.use(xss());
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/autorecon-api', routes);

app.get('/', (req, res) => {
  res.status(200).send({ name, version });
});

app.get('*', (req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: 'Nof found!',
  });
});

module.exports = app;
