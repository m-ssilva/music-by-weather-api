const spotifyService = require('../services/spotify')
const weatherService = require('../services/weather')
const controller = require('../controllers/index.controller')

exports.get = async ctx => {
  const { city } = ctx.request.query
  const { main: { temp: temperature } } = await weatherService.getWeatherByCityName(city)
  const category = controller.temperatureToCategory(temperature)
  ctx.status = 200
  ctx.body = await spotifyService.getPlaylistByCategory(category)
}