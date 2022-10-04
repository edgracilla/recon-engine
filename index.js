const app = require('./src/app');
const config = require('./src/config/app');
const logger = require('./src/utils/logger');

const server = app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});

const exitHandler = (err) => {
  if (err) {
    logger.error(err);
  }

  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

process.on('uncaughtException', exitHandler);
process.on('unhandledRejection', exitHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
