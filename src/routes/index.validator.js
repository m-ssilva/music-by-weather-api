const validate = queryParams => {
  const errors = []
  if (!queryParams.city) { errors.push({ message: 'Informe uma cidade válida', path: 'req.params.city' }) }
  return errors
}

const paramsValidator = (ctx, next) => {
  const result = validate(ctx.request.query)
  if (result.length) {
    ctx.status = 400
    ctx.body = { errors: result }
  }
  else return next()
}

module.exports = {
  paramsValidator
}