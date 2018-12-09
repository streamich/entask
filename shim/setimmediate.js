/* eslint-disable strict */
var macrotask = require('..').macrotask;

exports.install = function () {
  var g = typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
      ? global
      : typeof self !== undefined
        ? self : this;

  if (g) {
    g.setImmediate = macrotask;
  }
};
