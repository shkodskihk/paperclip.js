Clip      = require "./clip"
paper     = require "./paper"
browser   = require "./browser"
translate = require "./translate"
adapters  = require "./node/adapters"


module.exports = browser

# node
module.exports.compile  = translate.compile

# express
module.exports.adapters = adapters

# register so that strings are compiled
paper.template.compiler = translate

