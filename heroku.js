var spawn = require('child_process').spawn
  , config = require('./config')

for(var k in config) {
  spawn(['heroku config:set ', k, '=', config[k], '--app=badperson'].join(''))
}

