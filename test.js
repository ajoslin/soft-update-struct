'use strict'

var test = require('tape')
var Struct = require('observ-struct')
var Observ = require('observ')
var update = require('./')

test('only sets one update for one change', function (t) {
  t.plan(2)
  var struct = Struct({
    a: Observ(1),
    b: Observ(2)
  })

  struct(function onChange (value) {
    t.pass('onChange')
  })

  update(struct, {
    a: 2,
    b: 2
  })
  t.deepEqual(struct(), {
    a: 2,
    b: 2
  })
})

test('only two updates for two changes', function (t) {
  t.plan(3)
  var struct = Struct({
    a: Observ(1),
    b: Observ(2),
    c: Observ(3)
  })

  struct(function onChange (value) {
    t.pass('onChange')
  })

  update(struct, {
    a: 3,
    b: 2,
    c: 1
  })

  t.deepEqual(struct(), {
    a: 3,
    b: 2,
    c: 1
  })
})

test('recursive', function (t) {
  t.plan(2)
  var struct = Struct({
    a: Struct({
      foo: Observ(1),
      bar: Observ(2)
    }),
    b: Observ(3)
  })

  struct(function onChange () {
    t.pass('onChange')
  })

  update(struct, {
    a: {
      foo: 2,
      bar: 2
    }
  })

  t.deepEqual(struct(), {
    a: {
      foo: 2,
      bar: 2
    },
    b: 3
  })
})
