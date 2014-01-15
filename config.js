var _config = null
module.exports = function() {
  try {
    var vlah = _config || (_config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8')))
    return vlah
  }
  catch(ex) {console.error(ex)}
  return {} // lol
}
