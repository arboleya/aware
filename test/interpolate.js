var should = require('chai').should();
var aware = require('../lib/aware');

describe('[interpolation]', function(){

  it('should interpolate two keys on first trigger', function(done){
    var store = aware();

    store.on('name', function handler(value){
      store.get('name').should.equal('Foo Bar');
      store.off('name', handler);
      done();
    });

    store.set('first-name', 'Foo');
    store.set('last-name', 'Bar');
    store.set('name', '#{first-name} #{last-name}');
  });

  it('should internally bind/unbind/trigger interpolated keys', function(done){

    var store = aware();

    var fnames = ['Foo', 'Fool', 'Foolish'];
    var names = ['Foo Bar', 'Fool Bar', 'Chocolate Bar', 'Chocolate Barish'];

    store.on('first-name', function first_handler(val){
      store.get('first-name').should.equal(fnames.shift());
      if(!fnames.length)
        store.off('first-name', first_handler);
    });

    store.on('name', function name_handler(val){
      store.get('name').should.equal(names.shift());
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
});