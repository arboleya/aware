var should = require('chai').should();
var aware = require('..');

describe('[interpolation]', function(){

  var store;

  it('should interpolate two keys on first trigger', function(done){
    store = aware();

    store.on('name', function handler(val){
      val.should.equal('Foo Bar');
      store.get('name').should.equal('Foo Bar');
      store.off('name', handler);
      done();
    });

    store.set('first-name', 'Foo');
    store.set('last-name', 'Bar');
    store.set('name', '#{first-name} #{last-name}');
  });

  it('should internally bind/unbind/trigger interpolated keys', function(done){

    var fnames = ['Foo', 'Fool', 'Foolish'];
    var names = ['Foo Bar', 'Fool Bar', 'Chocolate Bar', 'Chocolate Barish'];

    store = aware();

    store.on('first-name', function first_handler(val){
      var expected = fnames.shift();
      
      val.should.equal(expected);
      store.get('first-name').should.equal(expected);

      if(!fnames.length)
        store.off('first-name', first_handler);
    });

    store.on('name', function name_handler(val){
      var expected = names.shift();

      val.should.equal(expected);
      store.get('name').should.equal(expected);

      if(!names.length){
        store.off('name', name_handler);
        done();
      }
    });

    store.set('first-name', 'Foo');
    store.set('last-name', 'Bar');
    store.set('name', '#{first-name} #{last-name}');
    store.set('first-name', 'Fool');
    store.set('name', 'Chocolate #{last-name}');
    store.set('first-name', 'Foolish');
    store.set('last-name', 'Barish');
  });

  it('going nuts with multi-level interpolations', function(done){
    store  = aware();

    var expecteds = ['Hello Foo Bar!', 'Hello Fool Bar!'];

    store.on('greetings', function handler(val){
      var expected = expecteds.shift();
      val.should.equal(expected);
      store.get('greetings').should.equal(expected);

      if(!expecteds.length){
        store.off('greetings', handler);
        done();
      }
    });

    store.set('first-name', 'Foo');
    store.set('last-name', 'Bar');
    store.set('name', '#{first-name} #{last-name}');
    store.set('greetings', 'Hello #{name}!');
    store.set('first-name', 'Fool');
  });
});