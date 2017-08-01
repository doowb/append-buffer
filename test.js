'use strict';

var os = require('os');
require('mocha');
var assert = require('assert');
var appendBuffer = require('./');

describe('appendBuffer', function() {
  it('should append the buffer suffix to the buffer prefix with \\r\\n', function() {
    assert.deepEqual(appendBuffer(new Buffer('abc\r\n'), new Buffer('def')), new Buffer('abc\r\ndef\r\n'));
  });

  it('should append the buffer suffix to the buffer prefix with \\n:', function() {
    assert.deepEqual(appendBuffer(new Buffer('abc\n'), new Buffer('def')), new Buffer('abc\ndef\n'));
  });

  it('should append the buffer suffix to the buffer prefix without EOL', function() {
    assert.deepEqual(appendBuffer(new Buffer('abc'), new Buffer('def')), new Buffer('abc' + os.EOL + 'def'));
  });

  it('should append the string suffix to the buffer prefix with \\r\\n', function() {
    assert.deepEqual(appendBuffer(new Buffer('abc\r\n'), 'def'), new Buffer('abc\r\ndef\r\n'));
  });

  it('should append the string suffix to the buffer prefix with \\n:', function() {
    assert.deepEqual(appendBuffer(new Buffer('abc\n'), 'def'), new Buffer('abc\ndef\n'));
  });

  it('should append the string suffix to the buffer prefix without EOL', function() {
    assert.deepEqual(appendBuffer(new Buffer('abc'), 'def'), new Buffer('abc' + os.EOL + 'def'));
  });

  it('should not append EOL when suffix is empty', function() {
    assert.deepEqual(appendBuffer(new Buffer('abc'), new Buffer('')), new Buffer('abc'));
  });

  it('should not append EOL when suffix is undefined', function() {
    assert.deepEqual(appendBuffer(new Buffer('abc')), new Buffer('abc'));
  });

  it('should not append EOL when suffix is empty string', function() {
    assert.deepEqual(appendBuffer(new Buffer('abc'), ''), new Buffer('abc'));
  });
});

