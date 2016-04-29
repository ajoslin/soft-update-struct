'use strict'

var assert = require('assert-ok')
var assertObserv = require('assert-observ')
var partial = require('ap').partial
var forOwn = require('for-own')

module.exports = function softUpdateStruct (struct, data) {
  assertObserv(struct)
  assert(struct._type === 'observ-struct', 'expected observ-struct')

  if (arguments.length < 2) return partial(softUpdateStruct, struct)

  updateStruct(struct, data)

  return struct
}

function updateStruct (struct, data) {
  forOwn(data, function (value, key) {
    var cursor = struct[key]
    if (cursor._type === 'observ-struct') {
      return updateStruct(cursor, value)
    }
    if (cursor() !== value) {
      cursor.set(value)
    }
  })
}
