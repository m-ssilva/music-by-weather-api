/* istanbul ignore file */

const mockedMiddleware = async (ctx, next) => next()
const actionWithMiddleware = async () => console.log(`Testing GET on mockedRoute with middleware`)
const actionWithoutMiddleware = async () => console.log(`Testing GET on mockedRoute without middleware`)

module.exports = [{
  method: 'get',
  path: '/mock/getWithMiddleware',
  action: actionWithMiddleware,
  middleware: [mockedMiddleware]
},
{
  method: 'get',
  path: '/mock/getWithoutMiddleware',
  action: actionWithoutMiddleware
}]