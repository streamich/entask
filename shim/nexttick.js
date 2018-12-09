/* eslint-disable strict */
var microtask = require('..').microtask;

exports.install = function () {
  if (!microtask) return;

  if (typeof process === 'object') {
    process.nextTick = microtask;
  } else {
    var g = typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
        ? global
        : typeof self !== undefined
          ? self : this;

    if (g) {
      g.process = {
        nextTick: microtask
      };
    }
  }
};
