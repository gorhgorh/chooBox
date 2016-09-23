/* Page: tracker */

'use strict'
const name = 'tracker'
const debug = require('debug')('chooAudio:' + name)
const html = require('bel')
const songInfo = require('../elements/song-info')

const track = require('../elements/track')
const controls = require('../elements/controls')

function tracker (state, prev, send) {

  return html`
    <article class="cf">
      <div>${controls(state, prev, send)}</div>
      <div class="fl w-100 w-70-ns tc tracker">
        <h1>Tracker</h1>
        <h3>${state.title}</h3>
          <div class='test'>${songInfo(state)}</div>
        <main>
          ${track(state)}
        </main>

      </div>
      <div class="fl w-100 w-30-ns tc">
        <h1>Debug</h1>
        <div class="code">${JSON.stringify(state)}</div>
      </div>
    </article>
  `
}

module.exports = tracker
