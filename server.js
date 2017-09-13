require('dotenv').config()

const express = require('express')
const cors = require('cors')
const glob = require('glob')
const path = require('path')
const config = require('./server/config')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')

const app = express()

app.use(express.static('public'))
app.use(cors())

app.set('view engine','ejs')
app.set('views', __dirname + '/server/views');

glob.sync('./server/routes/*.js').forEach(file=>{
  const route = require(path.resolve(file))
  app.use(route)
});

const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const compiler = webpack(webpackConfig)

app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler, {
  log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));


app.use((req, res, next) => {
  const token = req.get('Authorization')
  if (token) {
    req.token = token
    next()
  } else {
    res.status(403).send({
      error: 'Please provide an Authorization header to identify yourself (can be whatever you want)'
    })
  }
})


app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})
