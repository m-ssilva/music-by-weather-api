const supertest = require('supertest')
const app = require('../../src/app')
const nock = require('nock')
const popPlaylistMock = require('../mocks/spotify-pop-playlist.json')
const popCategoryMock = require('../mocks/spotify-pop-category.json')
const weatherCampinas = require('../mocks/weather-campinas.json')
const expectedPopPlaylist = require('../expected/pop-playlist.json')
const config = require('../../config')

let request
let server

beforeEach(() => {
  server = app.listen()
  request = supertest(server)
})

afterEach(() => {
  server.close()
  nock.cleanAll()
})

describe('GET on /v1', () => {
  test('return 500 when spotify authentication fails', async () => {
    nock('http://api.openweathermap.org')
      .get(`/data/2.5/weather?q=FakeCity&units=metric&APPID=${config.weather_api.token}`)
      .reply(200, weatherCampinas)

    nock('https://accounts.spotify.com')
      .post('/api/token?grant_type=client_credentials')
      .reply(500)

    await request
      .get('/v1?city=FakeCity')
      .expect(500, { message: 'Oops, ocorreu um erro ao autenticar com a API do Spotify' })
  })

  test('return 200 and pop playlist when temperatature is higher then 25 celsius', async () => {
    nock('http://api.openweathermap.org')
      .get(`/data/2.5/weather?q=Campinas&units=metric&APPID=${config.weather_api.token}`)
      .reply(200, weatherCampinas)

    nock('https://accounts.spotify.com')
      .post('/api/token?grant_type=client_credentials')
      .reply(200, { access_token: 'F4K3T0K3N' })

    nock('https://api.spotify.com')
      .get('/v1/browse/categories/pop/playlists?limit=1')
      .reply(200, popCategoryMock)

    nock('https://api.spotify.com')
      .get('/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks')
      .reply(200, popPlaylistMock)

    await request
      .get('/v1?city=Campinas')
      .expect(200, expectedPopPlaylist)
  })

  test('return 500 when weather API throws an error', async () => {
    nock('http://api.openweathermap.org')
      .get(`/data/2.5/weather?q=FakeCity&units=metric&APPID=${config.weather_api.token}`)
      .reply(500, 'FAKE_ERROR')

    await request
      .get('/v1?city=FakeCity')
      .expect(500, { message: 'Erro ao consultar temperatura da cidade' })
  })

  test('return 400 when a invalid city is requested', async () => {
    nock('http://api.openweathermap.org')
      .get(`/data/2.5/weather?q=FakeCity&units=metric&APPID=${config.weather_api.token}`)
      .reply(404, 'INVALID_CITY')

    await request
      .get('/v1?city=FakeCity')
      .expect(400, { message: 'Cidade informada não foi encontrada' })
  })

  test('return 400 when not city is informed', async () => {
    await request
      .get('/v1?city')
      .expect(400, {
        errors:
          [{
            message: 'Informe uma cidade válida',
            path: 'req.params.city'
          }]
      })
  })

  test('return 500 when getTracksURLByCategory throws an error', async () => {
    nock('http://api.openweathermap.org')
      .get(`/data/2.5/weather?q=Campinas&units=metric&APPID=${config.weather_api.token}`)
      .reply(200, weatherCampinas)

    nock('https://accounts.spotify.com')
      .post('/api/token?grant_type=client_credentials')
      .reply(200, { access_token: 'F4K3T0K3N' })

    nock('https://api.spotify.com')
      .get('/v1/browse/categories/pop/playlists?limit=1')
      .reply(500, 'FAKE_ERROR')

    await request
      .get('/v1?city=Campinas')
      .expect(500, { message: 'Oops, ocorreu um erro ao solicitar sua playlist a API do Spotify' })
  })

  test('return 500 when getSongsByURL throws an error', async () => {
    nock('http://api.openweathermap.org')
      .get(`/data/2.5/weather?q=Campinas&units=metric&APPID=${config.weather_api.token}`)
      .reply(200, weatherCampinas)

    nock('https://accounts.spotify.com')
      .post('/api/token?grant_type=client_credentials')
      .reply(200, { access_token: 'F4K3T0K3N' })

    nock('https://api.spotify.com')
      .get('/v1/browse/categories/pop/playlists?limit=1')
      .reply(200, popCategoryMock)

    nock('https://api.spotify.com')
      .get('/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks')
      .reply(500, 'FAKE_ERROR')

    await request
      .get('/v1?city=Campinas')
      .expect(500, { message: 'Oops, ocorreu um erro ao solicitar suas músicas a API do Spotify' })
  })
})
