export default function logMessage(message) {
  // set this to 'false' if you don't want to print console log messages
  // should probably be set to 'false' in production
  const debug = true;
  if (debug && typeof parent.window.console === 'object') {
    parent.window.console.log(message);
  }
}
