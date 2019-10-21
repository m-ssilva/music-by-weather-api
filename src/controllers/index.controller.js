const temperatureToCategory = temp => {
  const parsedTemp = parseInt(temp)
  if (parsedTemp > 25) return 'pop'
  if (parsedTemp <= 25 && parsedTemp >= 10) return 'rock'
  if (parsedTemp < 10) return 'classical'
  throw new Error('INVALID_TEMPERATURE')
}

module.exports = {
  temperatureToCategory
}
