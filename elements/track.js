// Element: track
//
'use strict'
const name = 'track'
const debug = require('debug')('chooAudio:' + name)

const html = require('bel')

function trackInfo (state) {
  const pattern = state.pattern
  return html`<div class="flex-container">
    ${pattern.map(function(step,i){
      // debug(step)
      let curClass = ''
      const isCurStep = (state.curTick === i) ? true : false
      if(isCurStep === true) curClass = 'current'
      const checked = (step === true ) ? 'bg-dark-green' : 'bg-light-green'
      // const isCurrent = ()
      return html`
        <div class="flex-item ${checked}">
          <div class="stepBt ${checked} ${curClass}">
          </div>
          yo ${i}
        </div>`
      }
    )}
  </div>`
}

module.exports = trackInfo
