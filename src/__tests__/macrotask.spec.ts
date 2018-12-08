import {macrotask} from '..';

const sleep = t => new Promise(r => setTimeout(r, t));

test('exists', () => {
  expect(typeof macrotask).toBe('function');
});

test('works', async () => {
  const fn = jest.fn();
  macrotask(fn);
  expect(fn).toHaveBeenCalledTimes(0);
  await sleep(1);
  expect(fn).toHaveBeenCalledTimes(1);
});
