var should = require('chai').should(),
    aware = require('../lib/aware');

describe('[general]', function(){

  var store = null;

  beforeEach(function(){
    store = aware({});
  });

  it('should notify when value is new or different than previous', function(){
    var called = 0;
    var names = ['bender', 'lecter'];

    store.on('name', function(name){
      called++;
      name.should.equal(names.shift());
    });

    should.not.exist(store.get('gender'));

    store.set('name', 'bender');
    store.set('name', 'lecter');

    store.get('name').should.equal('lecter');
    called.should.equal(2);
  });

  it('should trigger event immediatelly when key is already present', function(){
    var called = 0;
    store.set('name', 'bender');

    store.on('name', function(name){
      called++;
      name.should.equal('bender');
    });

    called.should.equal(1);
  });


  it('should get undefined when reading an unexistent key', function(){
    should.not.exist(store.get('name'));
  });

  it('should unbind property properly', function(){
    var called = 0;
    var names = ['bender', 'lecter'];

    store.on('name', on_name_change = function(name){
      called++;
      name.should.equal(names.shift());
    });

    store.set('name', 'bender');
    store.set('name', 'lecter');
    store.get('name').should.equal('lecter');

    store.off('name', on_name_change);
    store.set('name', 'peter');
    store.set('name', 'rob');
    store.set('name', 'charles');

    called.should.equal(2);
  });

  it('should set dictionary properly', function(){
    var called = 0;
    var dict = {
      name: 'bender',
      type: 'robot'
    };

    store.on('name', function(name){
      called++;
      name.should.equal(dict.name);
    });

    store.on('type', function(name){
      called++;
      name.should.equal(dict.type);
    });

    store.set(dict);
    called.should.equal(2);
  });

  it('should alert about incompatible properly', function(){
    var pass = false;

    try {
      store.set('oi');
    }
    catch(err) {
      pass = true;
      should.exist(err);
      err.message.should.equal('Cannot set property, it must be a dictionary');
    }

    pass.should.equal(true);
  });
});