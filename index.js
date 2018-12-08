'use strict';

var microtaskProcessNextTick = ((typeof process === 'object') && !process.browser)
  ? process.nextTick || null
  : null;

// eslint-disable-next-line no-undef
var promise = typeof Promise === 'function' ? Promise.resolve() : null;
var microtaskPromise = promise ? function (fn) { promise.then(function () { fn(); }); } : null;

var Observer = typeof MutationObserver === 'function'
    ? MutationObserver
    // eslint-disable-next-line no-undef
    : typeof WebKitMutationObserver === 'function' ? WebKitMutationObserver : null;
var microtaskMutationObserver = Observer
  ? function (fn) {
      var observer = new Observer(function () { fn(); });
      var element = document.createTextNode('');
      observer.observe(element, {characterData: true});
      element.data = '';
    }
  : null;

var macrotaskSetImmediate = typeof setImmediate === 'function'
  ? setImmediate : null;

var macrotaskMessageChannel = typeof MessageChannel === 'function'
  ? function (fn) {
    var channel = new MessageChannel();
    channel.port1.onmessage = function () { fn(); };
    channel.port2.postMessage(0);
  }
  : null;

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

var macrotaskSetTimeout = function (fn) { setTimeout(fn, 0); };

var microtask = microtaskProcessNextTick || microtaskPromise || microtaskMutationObserver;
var macrotask = macrotaskSetImmediate || macrotaskWindowPostMessage || macrotaskMessageChannel || macrotaskSetTimeout;

exports.microtask = microtask;
exports.macrotask = macrotask;
exports.asap = microtask || macrotask;
