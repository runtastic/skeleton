describe 'greetingsAssembler', ->
  greetings = require('greetings')

  it 'assembles a welcome and place string to a greeting', ->
    equal(greetings.assembleGreetings(), 'Welcome to Runtastic!')
