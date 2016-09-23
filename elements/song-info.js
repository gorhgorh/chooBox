// Element: trackInfo
//
// We can use bel instead of choo/html to keep elements modular
// and allow them to easily move outisde of the app.
const html = require('bel')

function trackInfo (state) {
  return html`<div>${state.curTick + 1} / ${state.pattern.length}</div>`
}

module.exports = trackInfo
