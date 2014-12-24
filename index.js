/*!
 * callback-and-promise - index.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */

var Promise = require('native-or-bluebird')
var multiline = require('multiline')
var reserved = require('reserved')
var fmt = require('util').format

module.exports = function (name, $$__fn__$$) {
  if (typeof name === 'function') {
    $$__fn__$$ = name
    name = $$__fn__$$.name || 'anonymous'
  }
  name = reserved.indexOf(name) !== -1 ? '_' + name : name;

  var fnstr = fmt(multiline.stripIndent(function () {;/*
      (function %s() {
        var self = this
        var len = arguments.length
        var lastType = typeof arguments[len - 1]
        if (lastType === 'function') {
          return $$__fn__$$.apply(self, arguments)
        }

        var args = new Array(len + 1)
        for (var i = 0; i < len; i++) args[i] = arguments[i]

        return new Promise(function (reslove, reject) {
          args[len] = createCallback(reslove, reject)

          $$__fn__$$.apply(self, args)
        })
      })
  */}), name)

  return eval(fnstr)
}

function createCallback(resolve, reject) {
  return function(err, value) {
    if (err) return reject(err)
    var length = arguments.length
    if (length <= 2) return resolve(value)
    var values = new Array(length - 1)
    for (var i = 1; i < length; i++) values[i - 1] = arguments[i]
    resolve(values)
  }
}
