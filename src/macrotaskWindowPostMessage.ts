declare const postMessage: (message: any) => void;

export default (typeof window === 'object' && window.postMessage)
  ? fn => {
    const listener = () => {
      removeEventListener('message', listener);
      fn();
    };
    addEventListener('message', listener);
    postMessage(0);
  }
  : null;
