/* Page: tracker */

'use strict'
const name = 'tracker'
const debug = require('debug')('chooAudio:' + name)
const html = require('bel')
const songInfo = require('../elements/song-info')

const tracks = require('../elements/tracks')
const controls = require('../elements/controls')

function tracker (state, prev, send) {

  return html`
    <div class="cf">
      <div class="fl tracker">
        <h1>ChooAudio</h1>
        <div>${controls(state, prev, send)}</div>
        <h3>${state.title}</h3>
          <div class='test'>${songInfo(state)}</div>
        <main>
          ${tracks(state, prev, send)}
        </main>

      </div>
      <div class="fl">
        <h1>Debug</h1>
        <div class="code">${JSON.stringify(state)}</div>
      </div>
    </div>
  `
}

module.exports = tracker
