// Test reading uint8 values in different endiannesses. Regardless, the
// value should be the same.

var assert = require('assert');
var TestStream = require('./util').TestStream;
var strtok = require('../lib/strtok');

var seen = 0;
var data = '\x1a\x1a\x1a\x1a\x1a\x1a';

strtok.parse(new TestStream(data), function(v) {
    if (v === undefined) {
        return strtok.UINT8_LE;
    }

    switch (seen++ % 2) {
    case 0:
        assert.equal(v, 0x1a);
        return strtok.UINT8_BE;

    case 1:
        assert.equal(v, 0x1a);
        return strtok.UINT8_LE;
    }
});

process.on('exit', function() {
    assert.equal(data.length, seen);
});
