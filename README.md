# Aware

Bindable key-value storage.

[![Stories in Ready](https://badge.waffle.io/serpentem/aware.png)](http://waffle.io/serpentem/aware)

[![Build Status](https://travis-ci.org/serpentem/aware.png?branch=master)](https://travis-ci.org/serpentem/aware) [![Coverage Status](https://coveralls.io/repos/serpentem/aware/badge.png)](https://coveralls.io/r/serpentem/aware)

[![Dependency Status](https://gemnasium.com/serpentem/aware.png)](https://gemnasium.com/serpentem/aware)  [![NPM version](https://badge.fury.io/js/aware.png)](http://badge.fury.io/js/aware)

## Usage Drafts

Simple draft demonstrating how this should work.

> Attention, is a **WIP**! Do not use it yet.

### Example 1

````coffeescript
Bind = require 'aware'

data_store = new Bind

data_store.on 'name', (name)->
  console.log name

data_store.set 'name', 'bender' # will fire callback above
data_store.get 'name' # bender
```

### Example 2

````coffeescript
Bind = require 'aware'

data_store = new Bind
data_store.set 'name', 'bender'

# since the property name already exists, this callback will be fired right
# away, and after that every time the value for 'name' changes
data_store.on 'name', on_name_change = (name)->
  console.log name

data_store.set 'name', 'bender' # will fire nothing
data_store.set 'name', 'john' # will fire callback again
data_store.set 'name', 'lecter' # will fire callback again

# unlistening
data_store.off 'name', on_name_change

data_store.set 'name', 'peter' # will fire nothing
```

### Example 3
Bind = require 'aware'

You can set also a dictionary of key->values.

````coffeescript
# both set calls are equivalent

# multiple sets
data_store.set 'name', peter
data_store.set 'age', 30

# combined set
data_store.set name: peter, age: 30

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

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/serpentem/aware/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

