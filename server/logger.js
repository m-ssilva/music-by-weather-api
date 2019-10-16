const winston = require('winston')
const { winston: config } = require('../config')

const logger = new winston.createLogger({
  transports: [
    new winston.transports.File(config.file),
    new winston.transports.Console(config.console)
  ],
  exitOnError: false
})

logger.stream = {
  write: function (message, encoding) {
    logger.info(message)
  }
}

module.exports = logger