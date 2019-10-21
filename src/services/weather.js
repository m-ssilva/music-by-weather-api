const axios = require('axios')
const config = require('../../config')

const getWeatherByCityName = name =>
  axios({
    method: 'get',
    url: `http://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&APPID=${config.weather_api.token}`
  }).then(response => {
    return response.data
  })
    .catch(err => {
      if (err.response.status === 404) throw new Error('CITY_NOT_FOUND')
      throw new Error('WEATHER_REQUEST_FAILED')
    })

module.exports = {
  getWeatherByCityName
}
