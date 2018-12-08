/* eslint-disable */
const {microtask, macrotask} = require('.');

macrotask(() => console.log('world!'));
microtask(() => console.log('Hello'));
// 👉 Hello world!