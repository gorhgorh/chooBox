// Element: track
'use strict'
const name = 'controlls'
const debug = require('debug')('chooBox:' + name)

const html = require('bel')
const sf = require('sheetify')

const prefix = sf('../assets/css/controls.css')

function controls (state, prev, send) {
  function makePlayStopBt (state, prev, send) {
    if (state.isPlaying === true) {
      return html`<button onclick=${(e) => send('stop')}>stop</button>`
    } else {
      return html`<button onclick=${(e) => send('start')}>start</button>`
    }
  }
  return html`
  <div class="${prefix}" onload=${() => {
    send('initAudio')
  }}>
    <div class="controls">
      ${makePlayStopBt(state, prev, send)}
      <div class="bpm"><input type="text" oninput=${(e) => send('changeTempo', e.target.value)} value=${state.bpm}></div>
    </div>
  </div>
  `
}

module.exports = controls
  // <button onclick=${(e) => send('update')}>My effect</button>
  // <button onclick=${(e) => send('playTick')}>playTick</button>
  // <button onclick=${(e) => send('nextTick')}>nextTick</button>
  // <button onclick=${(e) => send('prevTick')}>prevTick</button>
