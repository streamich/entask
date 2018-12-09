/* eslint-disable */
const {microtask} = require('..');

const sleep = t => new Promise(r => setTimeout(r, t));

test('not null in testing environment', () => {
  expect(typeof microtask).toBe('function');
});

test('works', async () => {
  const fn = jest.fn();
  microtask(fn);
  expect(fn).toHaveBeenCalledTimes(0);
  await sleep(1);
  expect(fn).toHaveBeenCalledTimes(1);
});