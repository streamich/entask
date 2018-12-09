export type Enqueue = (fn: () => void) => void;

/**
 * Add callback to micro-task queue.
 */
export const microtask: Enqueue | null;

/**
 * Add callback to macro-task queue.
 */
export const macrotask: Enqueue;

/**
 * Add callback to micro-task queue, or, if not possible, ot macro-task queue.
 */
export const asap: Enqueue;
