const app = require('../src/app')
const config = require('../config')

app.listen(config.api.port, () =>
  console.log(`API listening on port ${config.api.port}`))
