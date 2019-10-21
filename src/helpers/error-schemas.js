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
  },
  'SPOTIFY_GET_PLAYLIST_ERROR': {
    status: 500,
    body: {
      message: 'Oops, ocorreu um erro ao solicitar sua playlist a API do Spotify'
    }
  },
  'SPOTIFY_GET_SONGS_ERROR': {
    status: 500,
    body: {
      message: 'Oops, ocorreu um erro ao solicitar suas músicas a API do Spotify'
    }
  },
  'DEFAULT': {
    status: 500,
    body: {
      message: 'Oops, ocorreu um erro em sua solicitação'
    }
  }
}

module.exports = errorSchemas