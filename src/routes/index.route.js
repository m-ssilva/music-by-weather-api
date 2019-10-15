const lib = require('../lib/index.lib')
const config = require('../../config')
const validator = require('./index.validator')
const errorHandler = require('../middlewares/error-handler')

module.exports = [{
  method: 'get',
  path: `/${config.api.version}`,
  action: lib.get,
  middleware: [validator.paramsValidator, errorHandler]
}]