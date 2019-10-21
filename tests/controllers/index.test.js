const controller = require('../../src/controllers/index.controller')

describe('Temperature to Category', () => {
  test('return pop if temperature is higher then 25', () => {
    const result = controller.temperatureToCategory(26)
    expect(result).toBe('pop')
  })

  test('return rock if temperature is lower or equal 25 and higher or equal 10', () => {
    const result = controller.temperatureToCategory(15)
    expect(result).toBe('rock')
  })

  test('return classical if temperature is lower then 10', () => {
    const result = controller.temperatureToCategory(9)
    expect(result).toBe('classical')
  })

  test('throw a error if temperature is empty', () => {
    expect(() => controller.temperatureToCategory()).toThrow('INVALID_TEMPERATURE')
  })

  test('throw a error if temperature is null', () => {
    expect(() => controller.temperatureToCategory(null)).toThrow('INVALID_TEMPERATURE')
  })

  test('throw a error if temperature is a string', () => {
    expect(() => controller.temperatureToCategory('NOT_NUMBER')).toThrow('INVALID_TEMPERATURE')
  })
})