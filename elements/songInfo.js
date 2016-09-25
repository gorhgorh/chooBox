// Element: trackInfo
//
// We can use bel instead of choo/html to keep elements modular
// and allow them to easily move outisde of the app.
const html = require('bel')
const sf = require('sheetify')

const prefix = sf('../assets/css/songInfo.css')

function trackInfo (state) {
  return html`
  <div class='songInfos ${prefix}'>
    <div>
      <span class="mainTitle">chooBox:</span><span class="songTitle">${state.title}</span>
    </div>
    <div>
      Step: <span class="sigStep">${state.curTick + 1}</span>/<span class="sig">${state.patterns[0].length}</span>
    </div>
  </div>`
}

module.exports = trackInfo
