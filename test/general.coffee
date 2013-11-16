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