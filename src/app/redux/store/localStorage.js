// This is a simple service/middleware.
//
// Its purpose is to regularly write the current state to the 'localStorage',
// so that the user doesn't loose data upon:
//
// * Browser refresh;
// * Accidental closing of window/tab;
// * System crash.
//
// It requires the user to be using a browser that supports 'localStorage',
// which is the case in most scenarios.
//
// This serves only as a safety net, as there will be another middleware
// regularly writting to the database as long as there has been a recent update.

export function loadState() {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined; // If state is null, return undefined so the app doesn't crash.
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined; // Do nothing, so the app doesn't crash.
  }
}

export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors so the app doesn't crash.
    // This will happen if 'localStorage' isn't available (Incognito/Private Mode)
  }
}
