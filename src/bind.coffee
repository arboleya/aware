Event = require 'the-event'

module.exports = class Bind
  ev: null

  constructor:->
    @ev = new Event

  on:(key, callback)->
    @ev.on key, callback

    store = @__store or @__store = {}
    if store.hasOwnProperty key
      @ev.emit key, store[key]

  off:(key, callback)->
    @ev.off key, callback

  get:(key)->
    return @__store?[key]

  set:(key, value)->
    store = @__store or @__store = {}

    if arguments.length is 2
      if store[key] isnt value
        @ev.emit key, store[key] = value
      return value

    else if key instanceof Object
      @set k, v for k, v of key
      return key
    else
      throw new Error 'Cannot set property, it must be a dictionary'