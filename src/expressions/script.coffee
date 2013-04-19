class Evaluator

  constructor: (@expr, @context) ->

class ScriptExpression

  ###
  ###

  constructor: (@script, @references, @modifiers) ->


  ###
  ###

  eval: (context) -> new Evaluator @, context


module.exports = ScriptExpression