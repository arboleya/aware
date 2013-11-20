Bind = require '../lib/bind'
should = require('chai').should()

describe '[general]', ->
  
  Sample = null

  before ->
    class Sample
      constructor:-> @store = new Bind


  it 'should notify when value is new or different than previous', ->

    called = 0
    tmp = new Sample
    names = ['bender', 'lecter']

    tmp.store.on 'name', ( name )->
      called++
      name.should.equal names.shift()

    should.not.exist tmp.store.get 'gender'

    tmp.store.set 'name', 'bender'
    tmp.store.set 'name', 'bender'
    tmp.store.set 'name', 'lecter'

    tmp.store.get('name').should.equal 'lecter'

    called.should.equal 2


  it 'should trigger event immediatelly when key is already present', ->

    called = 0
    tmp = new Sample
    tmp.store.set 'name', 'bender'

    tmp.store.on 'name', ( name )->
      called++
      name.should.equal 'bender'

    called.should.equal 1


  it 'should get undefined when reading an unexistent key', ->

    tmp = new Sample
    should.not.exist tmp.store.get 'name'

  it 'should unbind property properly', ->

    called = 0
    tmp = new Sample
    names = ['bender', 'lecter']

    tmp.store.on 'name', on_name_change = ( name )->
      called++
      name.should.equal names.shift()

    tmp.store.set 'name', 'bender'
    tmp.store.set 'name', 'lecter'
    tmp.store.get('name').should.equal 'lecter'

    tmp.store.off 'name', on_name_change
    tmp.store.set 'name', 'peter'
    tmp.store.set 'name', 'rob'
    tmp.store.set 'name', 'charles'

    called.should.equal 2

  it 'should set dictionary properly', ->

    called = 0
    tmp = new Sample
    dict = 
      name: 'bender'
      type: 'robot'

    tmp.store.on 'name', ( name )->
      called++
      name.should.equal dict.name

    tmp.store.on 'type', ( name )->
      called++
      name.should.equal dict.type

    tmp.store.set dict

    called.should.equal 2

  it 'should alert about incompatible properly', ->

    tmp = new Sample
    pass = false

    try
      tmp.store.set 'oi'
    catch err
      pass = true
      should.exist err
      err.message.should.equal 'Cannot set property, it must be a dictionary'

    pass.should.equal true