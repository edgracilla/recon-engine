require('express-async-errors');

const cors = require('cors');
const xss = require('xss-clean');
const helmet = require('helmet');
const express = require('express');
const compression = require('compression');
const expressPino = require('express-pino-logger');

const logicAbc = require('recon-logic-abc');

const api = require('./utils/api');
const config = require('./config/app');
const logger = require('./utils/logger');
const pinoConf = require('./config/pino');

const app = express();

app.use(cors());
app.options('*', cors());

app.use(xss());
app.use(helmet());
app.use(compression());
app.use(express.json());

app.use(expressPino({ logger, ...pinoConf }));
app.use(express.urlencoded({ extended: true }));

logicAbc.bind({
  logger,
  config,
});

app.use('/logic-abc', logicAbc.router);

app.get('/', api.rootHandler);
app.use('*', api.notFoundHandler);
app.use(api.errHandler);

module.exports = app;
