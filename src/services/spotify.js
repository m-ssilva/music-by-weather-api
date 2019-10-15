const axios = require('axios')
const config = require('../../config')
const moment = require('moment')

let lastTokenRequest

const getToken = () => {
  if (!lastTokenRequest || lastTokenRequest.expiresIn < moment()) {
    return axios({
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      params: {
        grant_type: 'client_credentials'
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: config.spotify.client_id,
        password: config.spotify.secret_key
      }
    }).then(response => {
      lastTokenRequest = {
        token: response.data.access_token,
        expiresIn: moment().add(1, 'hour')
      }
      return lastTokenRequest
    })
      .catch(error => {
        console.log(error)
        throw new Error('SPOTIFY_AUTHENTICATION_FAILED')
      })
  } else return lastTokenRequest
}

const getTracksURLByCategory = async category => {
  const { token } = await getToken()
  const tracksURL = axios({
    url: `${config.spotify.api_host}/browse/categories/${category}/playlists?limit=1`,
    method: 'get',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(response => {
    return response.data.playlists.items[0].tracks.href
  }).catch(err => {
    console.log(err)
    throw new Error('SPOTIFY_GET_PLAYLIST_ERROR')
  })

  return tracksURL
}

const getSongsByURL = async tracksUrl => {
  const { token } = await getToken()
  const songs = axios({
    url: tracksUrl,
    method: 'get',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(response => response.data)
    .catch(err => {
      console.log(err)
      throw new Error('SPOTIFY_GET_SONGS_ERROR')
    })
  return songs
}

const getPlaylistByCategory = async category => {
  const trackUrl = await getTracksURLByCategory(category)
  const { items } = await getSongsByURL(trackUrl)
  const parsedSongs = songsParser(items)
  return parsedSongs
}

const songsParser = async songs =>
  songs.map(song => {
    return {
      song: song.track.name,
      artist: song.track.artists.map(artist => artist.name),
      songURL: song.track.external_urls.spotify
    }
  })

module.exports = {
  getToken,
  getPlaylistByCategory
}
