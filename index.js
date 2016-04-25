'use strict'

var assert = require('assert-ok')
var assertObserv = require('assert-observ')
var partial = require('ap').partial
var softSet = require('soft-set')
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
    if (value._type === 'observ-struct') {
      return updateStruct(struct[key], value)
    }
    if (struct[key]() !== value) {
      struct[key].set(value)
    }
  })
}
