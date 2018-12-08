import microtask from 'current-tick';
import macrotaskSetImmediate from './macrotaskSetImmediate';
import macrotaskMessageChannel from './macrotaskMessageChannel';
import macrotaskWindowPostMessage from './macrotaskWindowPostMessage';
import macrotaskSetTimeout from './macrotaskSetTimeout';

const macrotask = macrotaskSetImmediate || macrotaskMessageChannel || macrotaskWindowPostMessage || macrotaskSetTimeout;
const asap = microtask || macrotask;

export {
  microtask,
  macrotask,
  asap,
};
