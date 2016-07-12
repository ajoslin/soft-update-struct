# soft-update-struct [![Build Status](https://travis-ci.org/ajoslin/soft-update-struct.svg?branch=master)](https://travis-ci.org/ajoslin/soft-update-struct)

> Recursively update an observ-struct, only setting values that changed


## Install

```
$ npm install --save soft-update-struct
```


## Usage

```js
var softUpdateStruct = require('soft-update-struct')
var Struct = require('observ-struct')
var Observ = require('observ')

var struct = Struct({
  foo: Observ(1),
  bar: Observ(2),
  baz: Observ(3)
})

softUpdateStruct(struct, {
  foo: 2,
  bar: 2
})

struct() // => {foo: 2, bar: 2, baz: 3}
```

## API

#### `softUpdateStruct(struct, [data], [compareFn])` -> `struct / function`

Recursively updates values in `struct` from `data`, only calling set on values that have changed.

##### struct

*Required*
Type: `function`

An observable [struct](https://github.com/raynos/observ-struct).

##### data

Type: `object`

The data to use to update the struct. All keys must have already been defined as observables in the struct. If `data` is omitted, a partially applied function that takes a `data` argument will be returned.

##### compareFn

Type: `function compare (a, b) -> Boolean`

By default, changes are detected through an equality-by-reference check (`===`). Pass in a custom compareFn to change the change detection logic.

## License

MIT © [Andrew Joslin](http://ajoslin.com)
