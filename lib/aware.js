var happens = require('happens');

module.exports = function(){
  return new Aware();
};

module.exports.Aware = Aware;

function Aware() {
  this.event = happens({});
  this.__store = {};
}

Aware.prototype.on = function(key, fn){
  this.event.on(key, fn);
  if(this.__store.hasOwnProperty(key))
    this.event.emit(key, this.get(key));
};

Aware.prototype.off = function(key, fn){
  this.event.off(key, fn);
};

Aware.prototype.get = function(key){
  return this.__store[key];
};

Aware.prototype.set = function(key, value){
  if(arguments.length == 2) {
    if(this.__store[key] !== value)
      this.event.emit(key, this.__store[key] = value);
    return value;
  }
  else if(key instanceof Object) {
    for(var p in key) this.set(p, key[p]);
    return key;
  }
  else
    throw new Error('Cannot set property, it must be a dictionary');
};