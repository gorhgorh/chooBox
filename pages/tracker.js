/* Page: tracker */

'use strict'
const name = 'tracker'
const debug = require('debug')('chooBox:' + name)
const html = require('bel')
const songInfo = require('../elements/songInfo')

const tracks = require('../elements/tracks')
const beatBar = require('../elements/beatBar')
const controls = require('../elements/controls')

function tracker (state, prev, send) {
  return html`
    <div class="wrapper">
      <div class="fl tracker">

        ${songInfo(state)}
        <div>${controls(state, prev, send)}</div>
        <main>
          ${tracks(state, prev, send)}
          ${beatBar(state, prev, send)}
        </main>

      </div>
      <div class="fl">
        <h1>Debug</h1>
        <div class="code">${JSON.stringify(state).replace(/,"/g, ',\n"').replace(/, "/g, ',\n"')}</div>
      </div>
      <div>
        <br><br>
        early stage experiment to learn the <a href="https://github.com/yoshuawuyts/choo">choo</a> framework <br>
        v:${state.version}
      </div>
    </div>
  `
}

module.exports = tracker
