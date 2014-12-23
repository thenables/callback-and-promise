callback-and-promise
---------------

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]
[![Gittip][gittip-image]][gittip-url]

[npm-image]: https://img.shields.io/npm/v/callback-and-promise.svg?style=flat-square
[npm-url]: https://npmjs.org/package/callback-and-promise
[travis-image]: https://img.shields.io/travis/thenable/callback-and-promise.svg?style=flat-square
[travis-url]: https://travis-ci.org/thenable/callback-and-promise
[coveralls-image]: https://img.shields.io/coveralls/thenable/callback-and-promise.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/thenable/callback-and-promise?branch=master
[david-image]: https://img.shields.io/david/thenable/callback-and-promise.svg?style=flat-square
[david-url]: https://david-dm.org/thenable/callback-and-promise
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[gittip-image]: https://img.shields.io/gittip/dead-horse.svg?style=flat-square
[gittip-url]: https://www.gittip.com/dead-horse/

make generate async function return promise when callback not present

- support both callback and promise 
- Preserves function names
- Uses a native promise implementation if available and tries to fall back to `bluebird`
- Converts multiple arguments from the callback into an `Array`

## Installation

```bash
$ npm install callback-and-promise --save
```

## Usage

### Examples

- Promisifies a single function:

```js
var promisify = require('callback-and-promise');

var somethingAsync = promisify(function somethingAsync(a, b, c, callback) {
  callback(null, a, b, c);
});

// return a promise when callback not present
somethingAsync(a, b, c).then().catch();

// common async style
somethingAsync(a, b, c, callback);
```

- Promisifies all the selected functions in an object:

```js
var promisifyAll = require('callback-and-promise/all');

var fs = promisifyAll(require('fs'), {}, [
  'readFile',
  'writeFile',
]);

fs.readFile(__filename).then(function (buffer) {
  console.log(buffer.toString());
});
```

### APIs

#### var fn = promisify([name], fn)

- `name` - custom function name
- `fn` - the source function

#### var obj = thenify(source, [obj], [methods])

- `source` - the source object for the async functions
- `obj` - the destination to set all the promisified methods
- `methods` - an array of method names of source

## License

MIT
