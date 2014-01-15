var Twit = require('twit')
  , people = require('./badpeople')

setInterval(function() {
  var T = new Twit({
      consumer_key:         '...'
    , consumer_secret:      '...'
    , access_token:         '...'
    , access_token_secret:  '...'
  })

  var index = Math.floor(Math.random() * people.length)
    , person = people[index]

  T.post('statuses/update', { status: person + " is a bad person"}, function(err, reply) {
    console.log('Told the world that ' + person + ' is a bad person')
  })
}, 1000 * 60 * 30)



