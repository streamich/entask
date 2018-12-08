'use strict';

var microtaskProcessNextTick = typeof process === 'object'
  ? process.nextTick || null
  : null;

// eslint-disable-next-line no-undef
var promise = typeof Promise === 'function' ? Promise.resolve() : null;
var microtaskPromise = promise ? function (fn) { promise.then(function () { fn(); }); } : null;

var macrotaskSetImmediate = typeof setImmediate === 'function'
  ? setImmediate : null;

var macrotaskMessageChannel = typeof MessageChannel === 'function'
  ? function (fn) {
    var channel = new MessageChannel();
    channel.port1.onmessage = function () { fn(); };
    channel.port2.postMessage(0);
  }
  : null;

var microtask = microtaskProcessNextTick || microtaskPromise;
var macrotask = macrotaskSetImmediate || macrotaskMessageChannel || setTimeout;

exports.microtask = microtask;
exports.macrotask = macrotask;
exports.asap = microtask || macrotask;
