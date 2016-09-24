// Element: tracks
//
'use strict'
const name = 'tracks'
const debug = require('debug')('chooAudio:' + name)

const html = require('bel')

function tracks (state, prev, send) {
  const patterns= state.patterns
  return html`
    ${patterns.map((track, pI) => {
      return html`<div class="flex-container">
        ${track.map((step, sI) => {
          let curClass = ''
          const isCurStep = (state.curTick === sI) ? true : ''
          if (isCurStep === true) curClass = 'current'
          const checked = (step === true) ? 'stepOn' : 'stepOff'
          const stepInfo = [pI,sI]
          return html`
          <div class="flex-item">
            <div class="stepBt ${checked} ${curClass}" onclick=${(e) => send('toggleStep', stepInfo)}>
              ${sI + 1}
            </div>
          </div>`
        })}
      </div`})}
    `
}

module.exports = tracks
