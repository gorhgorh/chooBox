// Element: debug
//
'use strict'
const name = 'debuger'
const debug = require('debug')('chooBox:' + name)

const html = require('bel')
const sf = require('sheetify')

const prefix = sf('../assets/css/debuger.css')

function makeDbgString (state) {
  if (state.songDbg === true) return html`
    <h1>Debug</h1>
    <div class="code">${JSON.stringify(state).replace(/,"/g, ',\n"').replace(/, "/g, ',\n"')}</div>
  `
}

function makeDbgBt (songDbg, send) {
  let btStr
  if (songDbg === 'true') {
    debug('it happened')
    btStr = html`
    <span class='dbgSwitchBt' onhover='${send('toggleDbg', false)}'>-</span>
    `
  } else {
    debug('open')
    btStr = html`
    <span class='dbgSwitchBt' onhover='${send('toggleDbg', true)}'>+</span>
    `
  }
  return btStr
}

function debuger (state, prev, send) {
  return html`
  <div class="${prefix}">
    ${makeDbgString(state)}
  </div>
  `
}

module.exports = debuger
