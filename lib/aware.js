var happens = require('happens');

module.exports = function(){
  return new Aware();
};

module.exports.Aware = Aware;

function Aware() {
  this.__store = {};
  this.__handlers = {};
  this.__happens = happens({});
}

Aware.prototype.on = function(key, fn, bypass){
  this.__happens.on(key, fn);
  if(this.__store.hasOwnProperty(key) && !bypass)
    fn(this.get(key));
};

Aware.prototype.off = function(key, fn){
  this.__happens.off(key, fn);
};

Aware.prototype.get = function(key){
  return interpolate(this, this.__store[key]);
};

Aware.prototype.set = function(key, value){
  if(arguments.length == 2) {
    this.__store[key] = this.__store[key] || {};
    this.__handlers[key] = this.__handlers[key] || {};
    if(this.__store[key] !== value){
      this.__store[key] = value;
      emit(this, key);
      toogle(this, key, value);
    }
    return value;
  }

  else if(key instanceof Object) {
    for(var k in key) this.set(k, key[k]);
    return key;
  }

  else
    throw new Error('Cannot set property, it must be a dictionary');
};



/**
 * Goodies
 */
function interpolate(aw, value){
  if(value === undefined) return null;
  var t, token, tokens = tokenize(value);
  for(t in tokens){
    token = tokens[t];
    value = value.replace(token, aw.get(clean(token)));
  }
  return value;
}

function toogle(aw, key, value){
  var parent, t,tokens = tokenize(value);

  for(t in tokens)
    bind(aw, key, tokens[t] = clean(tokens[t]));

  for(parent in aw.__handlers[key])
    if(tokens.indexOf(parent) === -1)
      unbind(aw, key, parent);
}

function bind(aw, key, parent){
  if(!aw.__handlers[key][parent]){
    aw.on(parent, aw.__handlers[key][parent] = function(value){
      emit(aw, key);
    }, true);
  }
}

function unbind(aw, key, parent){
  aw.off(parent, aw.__handlers[key][parent]);
  aw.__handlers[key][parent] = null;
  delete aw.__handlers[key][parent];
}

function emit(aw, key){
  aw.__happens.emit(key, aw.get(key));
}


function tokenize(str){
  return str.match(/\{{2}?([^\}]+)\}{2}?/g) || [];
}

function clean(str){
  return str.replace(/(\{|\})/g, '');
}