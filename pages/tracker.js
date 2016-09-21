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
      ${controls(state)}
      <div class="fl w-100 w-70-ns tc tracker">
        <h1>Tracker</h1>
        <h3>${state.title}</h3>
          <div><button onclick=${(e) => send('update')}>My effect</button></div>
          <div><button onclick=${(e) => send('playTick')}>playTick</button></div>
          <div><button onclick=${(e) => send('nextTick')}>nextTick</button></div>
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
