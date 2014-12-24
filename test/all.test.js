
var assert = require('assert')

var thenify = require('../all')

describe('callback-and-promise/all', function () {
  it('promisifyAll(fs, {}, ["readFile"])', function () {
    var fs = thenify(require('fs'), {}, [
      'readFile',
    ])

    return fs.readFile(__filename, 'utf8').then(function (string) {
      assert(~string.indexOf('kasjdflasjkdflajsdfklajs dajsdfakls;dfjal;ksdfj akls;dfj als;kdfj asdf'))
    })
  })

  it('promisifyAll(fs, ["readFile"])', function () {
    var fs = thenify(require('fs'), [
      'readFile',
    ])

    return fs.readFile(__filename, 'utf8').then(function (string) {
      assert(~string.indexOf('kasjdflasjkdflajsdfklajs dajsdfakls;dfjal;ksdfj akls;dfj als;kdfj asdf'))
    })
  })

  it('promisifyAll(fs)', function () {
    var fs = thenify(require('fs'))

    return fs.readFile(__filename, 'utf8').then(function (string) {
      assert(~string.indexOf('kasjdflasjkdflajsdfklajs dajsdfakls;dfjal;ksdfj akls;dfj als;kdfj asdf'))
      return fs.stat(__filename)
    }).then(function (stat) {
      assert(stat.size, fs.statSync(__filename).size)
    })
  })

  it('promisifyAll(fs, destination)', function () {
    var fs = {};
    thenify(require('fs'), fs)

    return fs.readFile(__filename, 'utf8').then(function (string) {
      assert(~string.indexOf('kasjdflasjkdflajsdfklajs dajsdfakls;dfjal;ksdfj akls;dfj als;kdfj asdf'))
      return fs.stat(__filename)
    }).then(function (stat) {
      assert(stat.size, fs.statSync(__filename).size)
    })
  })

  it('promisifyAll with reserved words', function () {
    var module = {
      delete: function () {}
    }
    module = thenify(module)
    assert(typeof module.delete.name, 'function')
    assert(module.delete.name, 'anonymous')
  })
})
