var Twit = require('twit')
  , people = require('./badpeople')
  , fs = require('fs')
  , http = require('http')
  , config = require('./config')


var words = [ "an awful", "a bad", "a disastrous", "a sick", "a disappointing", "a sexy", "an atrocious", "a dreadful",
              "an unacceptable", "an abominable", "a deficient", "a godawful", "an unsatisfactory", "an inadequate"]

setInterval(function() {
  var T = new Twit({
    consumer_key:          process.env.CONSUMER_KEY || config().CONSUMER_KEY
    , consumer_secret:     process.env.CONSUMER_SECRET || config().CONSUMER_SECRET
    , access_token:        process.env.ACCESS_TOKEN || config().ACCESS_TOKEN
    , access_token_secret: process.env.ACCESS_TOKEN_SECRET || config().ACCESS_TOKEN_SECRET
  })

  var index = Math.floor(Math.random() * people.length)
    , person = people[index]
    , wordindex = Math.floor(Math.random(words.length))
    , word = words[wordindex]

  T.post('statuses/update', { status: 'So, ' + person + " is " + word + " person"}, function(err, reply) {
    console.log('Told the world that ' + person + ' is a bad person', err, reply)
  })
}, 1000 * 60 * (Math.random() * 10) + 20)


http.createServer(function(req, res) {
  res.end("Ben Hall is definitely a bad person", 200)
}).listen(process.env.PORT || 8080)
