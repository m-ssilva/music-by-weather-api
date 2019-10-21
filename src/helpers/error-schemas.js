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
  },
  'INVALID_TEMPERATURE': {
    status: 500,
    body: {
      message: 'Oops, ocorreu um erro ao consultar a temperatura da cidade'
    }
  },
  'SPOTIFY_AUTHENTICATION_FAILED': {
    status: 500,
    body: {
      message: 'Oops, ocorreu um erro ao autenticar com a API do Spotify'
    }
  }
}

module.exports = errorSchemas