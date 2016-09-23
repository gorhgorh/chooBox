// Element: track
'use strict'
const name = 'controlls'
const debug = require('debug')('chooAudio:' + name)

const html = require('bel')

function controls (state, prev, send) {
  return html`
  <div class="" onload=${() => send('start')}>
    <div class="controls">
      <button onclick=${(e) => send('update')}>My effect</button>
      <button onclick=${(e) => send('start')}>start</button>
      <button onclick=${(e) => send('stop')}>stop</button>
      <button onclick=${(e) => send('playTick')}>playTick</button>
      <button onclick=${(e) => send('nextTick')}>nextTick</button>
      <button onclick=${(e) => send('prevTick')}>prevTick</button>
    </div>
    <div class="bpm"><input type="text" oninput=${(e) => send('changeTempo', e.target.value)} value=${state.bpm}></div>
  </div>
  `
}

module.exports = controls
