const axios = require('axios')
const config = require('../../config')

const getWeatherByCityName = name =>
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&APPID=${config.weather_api.token}`
    )
    .catch(err => console.log(err))

module.exports = {
  getWeatherByCityName
}
