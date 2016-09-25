// Element: track
'use strict'
const name = 'controlls'
const debug = require('debug')('chooBox:' + name)

const html = require('bel')
const sf = require('sheetify')

const prefix = sf('../assets/css/controls.css')

function makePlayStopBt (isP, send) {
  if (isP=== true) {
    return html`<button class='stopBt' onclick=${(e) => send('stop')}></button>`
  } else {
    return html`<button class='startBt' onclick=${(e) => send('start')}></button>`
  }
}

function controls (state, prev, send) {

  return html`
  <div class="${prefix}" onload=${() => {
    send('initAudio')
  }}>
    <div class="controls flex-container">
      <div class="flex-item">
        ${makePlayStopBt(state.isPlaying, send)}
      </div>
      <div class="flex-item">
        <button class='nextBt' onclick=${(e) => send('playTick')}></button>
      </div>
      <div class="bpm flex-item">
        bpm <input type="text" oninput=${(e) => send('changeTempo', e.target.value)} value=${state.bpm}>
      </div>
    </div>
  </div>
  `
}

module.exports = controls
  // <button onclick=${(e) => send('update')}>My effect</button>
  // <button onclick=${(e) => send('nextTick')}>nextTick</button>
  // <button onclick=${(e) => send('prevTick')}>prevTick</button>
