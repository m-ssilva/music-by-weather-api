const axios = require('axios')
const config = require('../../config')

const getToken = () =>
  axios({
    method: 'POST',
    url: config.spotify.authorization_host,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: generateBasicToken(
        config.spotify.client_id,
        config.spotify.secret_key
      )
    },
    data: {
      'grant-type': 'client_credentials'
    }
  })
    .then(response => response)
    .catch(err => new Error('ERROR_SPOTIFY_TOKEN_REQUEST'))

const generateBasicToken = (client_id, client_secret) =>
  `Basic ${Buffer.from(`${client_id}:${client_secret}`, 'ascii').toString(
    'base64'
  )}`

const getPlaylistByCategory = category => axios({})
