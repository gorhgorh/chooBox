// Element: track
//
'use strict'
const name = 'track'
const debug = require('debug')('chooAudio:' + name)

const html = require('bel')

function trackInfo (state, prev, send) {
  const pattern = state.pattern
  return html`<div class="flex-container">
    ${pattern.map(function (step, i) {
      // debug(step)
      let curClass = ''
      const isCurStep = (state.curTick === i) ? true : ''
      if (isCurStep === true) curClass = 'current'
      const checked = (step === true) ? 'bg-dark-green' : 'bg-light-green'
      // const isCurrent = ()
      return html`
        <div class="flex-item">
          <div class="stepBt ${checked} ${curClass}">
            ${i}
          </div>
        </div>`
    }
  )}
  </div>`
}

module.exports = trackInfo
