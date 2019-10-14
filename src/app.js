const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')
const Router = new router()
const path = require('path')
const registerRoutes = require('./helpers/register-routes')
const bodyParser = require('koa-bodyparser')
const config = require('../config')
const morgan = require('morgan')

registerRoutes(Router, path.join(__dirname, './routes'))

app.use(bodyParser())
app.use(morgan('dev'))
app.use(Router.routes())

module.exports = app
