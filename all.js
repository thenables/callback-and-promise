/*!
 * callback-and-promise - all.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var promisify = require('./');


module.exports = function (source, destination, methods) {
  if (!destination) {
    destination = {}
    methods = Object.keys(source)
  }

  if (Array.isArray(destination)) {
    methods = destination
    destination = {}
  }

  if (!methods) {
    methods = Object.keys(source)
  }

  methods.forEach(function (name) {
    // promisify only if it's a function
    if (typeof source[name] === 'function') destination[name] = promisify(name, source[name])
  })

  // proxy the rest
  Object.keys(source).forEach(function (name) {
    if (destination[name]) return
    destination[name] = source[name]
  })

  return destination
}
