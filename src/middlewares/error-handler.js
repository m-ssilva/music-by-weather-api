const errorSchema = require('../helpers/error-schemas')

const errorHandler = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = errorSchema[err.message].status
    ctx.body = errorSchema[err.message].body
  }
}

module.exports = errorHandler