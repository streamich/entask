const {microtask, macrotask} = require('./lib');

macrotask(() => console.log('world!'));
microtask(() => console.log('Hello'));
// 👉 Hello world!