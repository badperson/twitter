var Twit = require('twit')
  , people = require('./badpeople')
  , fs = require('fs')
  , http = require('http')
  , config = require('./config')
  , heroku = require("heroku-ping")

var words = [ "an awful", "a bad", "a disastrous", "a sick", "a disappointing", "a sexy", "an atrocious", "a dreadful",
              "an unacceptable", "an abominable", "a deficient", "a godawful", "an unsatisfactory", "an inadequate"]
  , prefixes = [ "So", "And", "Erm", "Pretty much" ]

tweetlol()
setInterval(tweetlol, 1000 * 60 * (Math.random() * 10) + 20)

console.log('Loaded with', people, 'who are all bad people')

http.createServer(function(req, res) {
  res.end("Ben Hall is definitely a bad person", 200)
}).listen(process.env.PORT || 8080)

function tweetlol() {
  var T = new Twit({
    consumer_key:          process.env.CONSUMER_KEY || config().CONSUMER_KEY
    , consumer_secret:     process.env.CONSUMER_SECRET || config().CONSUMER_SECRET
    , access_token:        process.env.ACCESS_TOKEN || config().ACCESS_TOKEN
    , access_token_secret: process.env.ACCESS_TOKEN_SECRET || config().ACCESS_TOKEN_SECRET
  })

  var index = Math.floor(Math.random() * people.length)
    , person = people[index]
    , wordindex = Math.floor(Math.random() * words.length)
    , prefixindex = Math.floor(Math.random() * prefixes.length)
    , word = words[wordindex]
    , prefix = prefixes[prefixindex]

  T.post('statuses/update', { status: prefix + ', ' + person + " is " + word + " person"}, function(err, reply) {
    console.log('Told the world that ' + person + ' is a bad person', err, reply)
  })
}


heroku.ping({
  apps: [{ name: 'badperson' }]
})
