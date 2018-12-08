export default typeof MessageChannel === 'function'
  ? fn => {
    const channel = new MessageChannel();
    channel.port1.onmessage = () => fn();
    channel.port2.postMessage(0);
  }
  : null;
