happens = require( "happens" )

module.exports = function(target) {
  for(var prop in Aware)
    target[prop] = Aware[prop];
  return target;
};

function validate(fn) {
  if(!(fn && fn instanceof Function))
    throw new Error(fn + 'is not a function');
}

var Aware = {
  __init: function() {
    this.event = this.event || happens({});
    this.__store = this.__store || {};
  },

  on: function(key, fn){
    validate(fn);
    this.__init();
    this.event.on(key, fn);
    if(this.__store.hasOwnProperty(key))
      this.event.emit(key, this.get(key));
  },

  off: function(key, fn){
    this.__init();
    this.event.off(key, fn);
  },

  get: function(key){
    this.__init();
    return this.__store[key];
  },

  set: function(key, value){
    this.__init();
    if(arguments.length == 2) {
      if(this.__store[key] !== value)
        this.event.emit(key, this.__store[key] = value);
      return value;
    }
    else if(key instanceof Object) {
      for(var p in key) this.set(p, key[p]);
      return key;
    }
    
    throw new Error('Cannot set property, it must be a dictionary');
  }
}