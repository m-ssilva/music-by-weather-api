module.exports = {
  api: {
    port: process.env.PORT || 3000,
    version: 'v1'
  },
  weather_api: {
    token: '4c9093f427b537289b4ec79227c1aee1'
  },
  spotify: {
    authorization_host: 'https://accounts.spotify.com/api/token',
    api_host: 'https://api.spotify.com/v1',
    client_id: '68d800ce23a441338b3aca1a4e6cc0fb',
    secret_key: 'dac112644cbd46e898d556107fd5404a'
  },
  winston: {
    file: {
      level: 'info',
      filename: 'app.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }
  }
}
