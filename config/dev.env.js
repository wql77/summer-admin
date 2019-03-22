var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://localhost:9085/admin"',
  //BASE_API: '"http://94.191.67.11/"',
  BASE_API: '"http://192.168.0.104:8000"',
})
