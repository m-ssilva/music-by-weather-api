const errorSchemas = {
  'CITY_NOT_FOUND': {
    status: 400,
    body: {
      message: 'Cidade informada não foi encontrada'
    }
  },
  'WEATHER_REQUEST_FAILED': {
    status: 500,
    body: {
      message: 'Erro ao consultar temperatura da cidade'
    }
  }
}

module.exports = errorSchemas