'use strict'

var assert = require('assert-ok')
var assertObserv = require('assert-observ')
var partial = require('ap').partial
var forOwn = require('for-own')

module.exports = function softUpdateStruct (struct, data, compareFn) {
  assertObserv(struct)
  assert(struct._type === 'observ-struct', 'expected observ-struct')

  if (arguments.length < 2) return partial(softUpdateStruct, struct)

  if (!data) return struct

  updateStruct(struct, data, compareFn || isEqual)

  return struct
}

function updateStruct (struct, data, compareFn) {
  forOwn(data, function (value, key) {
    var cursor = struct[key]
    if (!cursor) return

    if (cursor._type === 'observ-struct') {
      return updateStruct(cursor, value, compareFn)
    }

    if (typeof cursor === 'function' && !compareFn(cursor(), value)) {
      cursor.set(value)
    }
  })
}

function isEqual (value1, value2) {
  return value1 === value2
}
