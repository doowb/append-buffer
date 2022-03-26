'use strict';

var os = require('os');
var equals = require('buffer-equal');

var createBuffer = function(src) {
  try {
    return Buffer.from(src)
  } catch (err) {
    return new Buffer(src)
  }
}

var cr = createBuffer('\r\n');
var nl = createBuffer('\n');


/**
 * Append a buffer to another buffer ensuring to preserve line ending characters.
 *
 * ```js
 * console.log([appendBuffer(new Buffer('abc\r\n'), new Buffer('def')).toString()]);
 * //=> [ 'abc\r\ndef\r\n' ]
 *
 * console.log([appendBuffer(new Buffer('abc\n'), new Buffer('def')).toString()]);
 * //=> [ 'abc\ndef\n' ]
 *
 * // uses os.EOL when a line ending is not found
 * console.log([appendBuffer(new Buffer('abc'), new Buffer('def')).toString()]);
 * //=> [ 'abc\ndef' ]
 * * ```
 * @param  {Buffer} `buf` Buffer that will be used to check for an existing line ending. The suffix is appended to this.
 * @param  {Buffer} `suffix` Buffer that will be appended to the buf.
 * @return {Buffer} Final Buffer
 * @api public
 */

module.exports = function appendBuffer(buf, suffix) {
  if (!suffix || !suffix.length) {
    return buf;
  }
  var eol;
  if (equals(buf.slice(-2), cr)) {
    eol = cr;
  } else if (equals(buf.slice(-1), nl)) {
    eol = nl;
  } else {
    return Buffer.concat([buf, createBuffer(os.EOL), createBuffer(suffix)]);
  }
  return Buffer.concat([buf, createBuffer(suffix), eol]);
};
