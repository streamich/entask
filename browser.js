'use strict';

// eslint-disable-next-line no-undef
var promise = typeof Promise === 'function' ? Promise.resolve() : null;
var microtaskPromise = promise ? function (fn) { promise.then(function () { fn(); }); } : null;

var macrotaskWindowPostMessage = (typeof window === 'object' && window.postMessage)
  ? function (fn) {
    var listener = function () {
      removeEventListener('message', listener);
      fn();
    };
    addEventListener('message', listener);
    postMessage(0);
  }
  : null;

var macrotaskSetTimeout = typeof setTimeout === 'function'
  ? function (fn) { setTimeout(fn, 0); }
  : null;

var microtask = microtaskPromise;
var macrotask = macrotaskWindowPostMessage || macrotaskSetTimeout;

exports.microtask = microtask;
exports.macrotask = macrotask;
exports.asap = microtask || macrotask;
