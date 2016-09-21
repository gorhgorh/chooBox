// Element: track
'use strict'
const name = 'controlls'
const debug = require('debug')('chooAudio:' + name)

const html = require('bel')

function controls (state, prev, send) {
  debug(send)
  return html`<div class="flex-container">
    <div class="controls">
      <button onclick=${(e) => { console.log(e) }}>play</button>
      <button onclick=${(e) => send('update')}>stop</button>
    </div>`
}

module.exports = controls
