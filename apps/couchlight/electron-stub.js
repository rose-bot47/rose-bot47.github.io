/* BROWSER STUB FOR COUCHLIGHT'S ELECTRON BRIDGE — this is the only part of the demo
 * that is not Couchlight's own code.
 *
 * In the desktop app, window.electronAPI is provided by electron/preload.js and every
 * call goes to Couchlight's main process. A web page has no main process, so this file
 * answers the five calls the interface actually makes:
 *
 *   getServices()      the same twelve services, copied from electron/main.js, in the
 *                      state the 0.9 beta ships in: the DRM services greyed "Pending"
 *                      until the Widevine signature lands.
 *   launchService(id)  the desktop app opens the service INSIDE its own window, where
 *                      the controller keeps working. A web page cannot do that, so this
 *                      asks the demo around it to say so, honestly. Nothing pretends to
 *                      play.
 *   closeWindow() / minimizeWindow()   return to the mock game library.
 *   toggleFullscreen()                 asks the demo page to go full screen.
 *
 * The grid, the controller support (a real pad works here, through the browser's own
 * Gamepad API), the settings and the guide are Couchlight's real renderer, unchanged.
 */
(function () {
  'use strict';
  var REASON = 'Waiting on our DRM signing certificate. It will unlock in an update — you will not need to reinstall.';
  var S = [
    ['netflix', 'Netflix', '#E50914', true, 'https://www.netflix.com'],
    ['hulu', 'Hulu', '#1CE783', true, 'https://www.hulu.com'],
    ['hbo', 'HBO Max', '#9919EB', true, 'https://www.hbomax.com'],
    ['prime', 'Prime Video', '#00A8E1', true, 'https://www.primevideo.com'],
    ['crunchyroll', 'Crunchyroll', '#F47521', true, 'https://www.crunchyroll.com'],
    ['youtube', 'YouTube', '#FF0000', false, 'https://www.youtube.com'],
    ['twitch', 'Twitch', '#9146FF', false, 'https://www.twitch.tv'],
    ['plex', 'Plex', '#E5A00D', false, 'https://app.plex.tv'],
    ['peacock', 'Peacock', '#00CCFF', true, 'https://www.peacocktv.com'],
    ['spotify', 'Spotify', '#1DB954', true, 'https://open.spotify.com'],
    ['disneyplus', 'Disney+', '#113CCF', true, 'https://www.disneyplus.com'],
    ['appletv', 'Apple TV', '#1C1C1E', true, 'https://tv.apple.com']
  ];
  var services = S.map(function (s) {
    return { id: s[0], name: s[1], color: s[2], drm: s[3], url: s[4], iconUrl: null,
             pending: s[3], pendingReason: s[3] ? REASON : null };
  });
  function tell(msg) {
    try { if (window.parent && window.parent !== window) { window.parent.postMessage(msg, '*'); return true; } } catch (e) {}
    return false;
  }
  window.__COUCHLIGHT_WEB_DEMO__ = true;
  window.electronAPI = {
    getServices: function () { return Promise.resolve(services.slice()); },
    launchService: function (id) {
      var s = services.filter(function (x) { return x.id === id; })[0];
      if (!s) return Promise.resolve({ success: false, error: 'Service not found' });
      if (tell({ type: 'couchlight-launch', id: s.id, name: s.name, url: s.url, pending: s.pending })) return Promise.resolve({ success: true });
      return Promise.resolve({ success: false, error: 'this is a browser demo; the desktop app opens it inside its own window' });
    },
    closeEmbedded: function () { return Promise.resolve({ success: true }); },
    isEmbeddedOpen: function () { return Promise.resolve(false); },
    getArtworkPath: function () { return Promise.resolve(null); },
    openSettings: function () { return Promise.resolve(); },
    closeWindow: function () { tell({ type: 'couchlight-exit' }); return Promise.resolve(); },
    minimizeWindow: function () { tell({ type: 'couchlight-exit' }); return Promise.resolve(); },
    toggleFullscreen: function () { tell({ type: 'couchlight-fullscreen' }); return Promise.resolve(); },
    onGamepadInput: function () {},
    onNavigateToSettings: function () {},
    removeAllListeners: function () {}
  };
})();
