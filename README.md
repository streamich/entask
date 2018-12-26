# entask

Enqueue *micro-tasks* and *macro-tasks* in browser and Node.js. Only [__0.3Kb__](https://bundlephobia.com/result?p=entask@1.4.0) in weight and __60 lines__ of code in length.


## What are micro- vs macro-tasks?

In Node.js and browsers *macro-tasks* are functions scheduled to be executed in
future event loop cycles, for example `setTimeout(fn, 0)` will schedule `fn` to
be executed in one of the future event loop cycles.

On the other hand, all callbacks in *micro-task* queue will execute before the
current event loop cycle finishes, for example in Node.js callbacks scheduled using
`process.nextTick(fn)` will all execute in the current event loop cycle.


## Install

```shell
npm install entask
```


## Usage

```js
import {microtask, macrotask, asap} from 'entask';

macrotask(() => console.log('world!'));
microtask(() => console.log('Hello'));
// 👉 Hello world!
```

or

```js
macrotask(() => console.log('C'));
microtask(() => console.log('B'));
console.log('A');
// 👉 A
// 👉 B
// 👉 C
```


## Reference


### `microtask`

Will schedule a *micro-task*, it will try to use the following methods in this order:

1. `process.nextTick`
2. `Promise`
3. `MutationObserver`
4. `WebkitMutationObserver`

If none of the methods are available, `microtask` itself will equal to `null`.


### `macrotask`

Will schedue a *macro-task*, it will try to use the following methods in this order:

1. `setImmediate`
2. `MessageChannel`
3. `window.postMessage`
4. `setTimeout`

If you are running in Node.js or browser environemnt, then `macrotask` will at least
default to `setTimeout`. If you are running in an evironment that does not even
have `setTimeout` method, `macrotask` may equal to `null`.


### `asap`

It is defined as

```js
const asap = microtask || macrotask;
```

i.e. `asap` will try to schedule a *micro-task* but fall back to scheduling a
*macro-task*.


## Lite

You can also use light version.

```js
import {microtask, macrotask, asap} from 'entask/lite';
```

It has the same API but does not include `MutationObserver`, because almost all
modern browsers will have `Promise` implementation. It also does not include
`window.postMessage`, because almost all modern browsers have `MessageChannel`
implementation available.


## Shims

You can shim `process.nextTick` in your browser.

```js
require('entask/shim/nexttick').install();
process.nextTick(() => { /* ... */ });
```

You can also shim `setImmediate`.

```js
require('entask/shim/setimmediate').install();
setImmediate(() => { /* ... */ });
```


## License

[Unlicense](LICENSE) &mdash; public domain.
