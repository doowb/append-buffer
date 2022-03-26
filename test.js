'use strict';

var os = require('os');
require('mocha');
var assert = require('assert');
var appendBuffer = require('./');

describe('appendBuffer', function() {
  it('should append the buffer suffix to the buffer prefix with \\r\\n', function() {
    assert.deepEqual(appendBuffer(Buffer.from('abc\r\n'), Buffer.from('def')), Buffer.from('abc\r\ndef\r\n'));
  });

  it('should append the buffer suffix to the buffer prefix with \\n:', function() {
    assert.deepEqual(appendBuffer(Buffer.from('abc\n'), Buffer.from('def')), Buffer.from('abc\ndef\n'));
  });

  it('should append the buffer suffix to the buffer prefix without EOL', function() {
    assert.deepEqual(appendBuffer(Buffer.from('abc'), Buffer.from('def')), Buffer.from('abc' + os.EOL + 'def'));
  });

  it('should append the string suffix to the buffer prefix with \\r\\n', function() {
    assert.deepEqual(appendBuffer(Buffer.from('abc\r\n'), 'def'), Buffer.from('abc\r\ndef\r\n'));
  });

  it('should append the string suffix to the buffer prefix with \\n:', function() {
    assert.deepEqual(appendBuffer(Buffer.from('abc\n'), 'def'), Buffer.from('abc\ndef\n'));
  });

  it('should append the string suffix to the buffer prefix without EOL', function() {
    assert.deepEqual(appendBuffer(Buffer.from('abc'), 'def'), Buffer.from('abc' + os.EOL + 'def'));
  });

  it('should not append EOL when suffix is empty', function() {
    assert.deepEqual(appendBuffer(Buffer.from('abc'), Buffer.from('')), Buffer.from('abc'));
  });

  it('should not append EOL when suffix is undefined', function() {
    assert.deepEqual(appendBuffer(Buffer.from('abc')), Buffer.from('abc'));
  });

  it('should not append EOL when suffix is empty string', function() {
    assert.deepEqual(appendBuffer(Buffer.from('abc'), ''), Buffer.from('abc'));
  });
});

