const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')
const Router = new router()
const path = require('path')
const registerRoutes = require('./helpers/register-routes')
const bodyParser = require('koa-bodyparser')

registerRoutes(Router, path.join(__dirname, './routes'))

app.use(bodyParser())
app.use(Router.routes())

module.exports = app
