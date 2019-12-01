const registerRoutes = require('../../src/helpers/register-routes')
const path = require('path')
const router = require('koa-router')

describe('Registering Routes', () => {
  test.only('Creating routes', () => {
    const Router = new router()
    registerRoutes(Router, path.join(__dirname, `../mocks`))
    expect(Router.stack.map(route => route.path)).toStrictEqual(['/mock/getWithMiddleware', '/mock/getWithoutMiddleware'])
  })
})