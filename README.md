# Aware

Bindable key-value storage.

[![Build Status](https://travis-ci.org/serpentem/aware.png?branch=master)](https://travis-ci.org/serpentem/aware)
[![Coverage Status](https://coveralls.io/repos/serpentem/aware/badge.png)](https://coveralls.io/r/serpentem/aware)
[![Dependency Status](https://gemnasium.com/serpentem/aware.png)](https://gemnasium.com/serpentem/aware)
[![NPM version](https://badge.fury.io/js/aware.png)](http://badge.fury.io/js/aware)

## Installation

````
npm install aware --save
````

## API

 - `.on(key, handler)` - listening for key changes
 - `.off(key, handler)` - unlistening key changes
 - `.get(key, 'value')` - getting key value
 - `.set(key, 'value')` - setting key value
  - `.set({key: 'value'})` - bulk set keys on dictionary

## Usage

### Basics

````javascript
var aware = require('aware');

var store = aware();

store.on('name', function(name){
  console.log(name);
}

store.set('name', 'bender'); // will fire handler above
store.get('name'); // bender

// since the property exists now, this handler will be fired right
// away, and after that every time the value for 'name' changes
var name_handler = function(name) {
  console.log(name);
};
store.on('name', name_handler);

store.set('name', 'bender'); // will fire nothing
store.set('name', 'john'); // will fire callback again
store.set('name', 'lecter'); // will fire callback again

// unlistening
store.off('name', name_handler);

store.set('name', 'peter'); // will fire nothing
```

### With objects

````javascript
var store = aware({
  set_name: function(name){
    this.set('name', name);
  }
});

store.on('name', function(name){
  console.log('name changed', name);
});

store.set_name('name', 'bender');
````

### With classes

````javascript
function Store(){
  aware(this);
}

Store.prototype.set_name = function(name){
  this.set('name', name);
}

var store = new Store();
store.on('name', function(name){
  console.log('name changed', name);
});

store.set_name('name', 'bender');
````

## Interpolation

Lets you compose variables bundling it based on values from one or more
different keys on store.

````javascript
var store = aware();

store.on('name', function(name){
  console.log('name changed', name);
});

store.set('name', '#{first-name} #{second-name}');
store.set('first-name', 'hannibal');
store.set('last-name', 'lecter');

````

# License

The MIT License (MIT)

Copyright (c) 2013 Anderson Arboleya
  
Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.