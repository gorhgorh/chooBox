// Element: beatBar
//
'use strict'
const name = 'beatBar'
const debug = require('debug')('chooBox:' + name)

const html = require('bel')
const sf = require('sheetify')

const prefix = sf('../assets/css/beatBar.css')


function beatBar (state, prev, send) {
  const pattern = state.patterns[0]
  return html`<div class="flex-container ${prefix}">
    ${pattern.map((step, sI) => {
      let curClass = ''
      const isCurStep = (state.curTick === sI) ? true : ''
      if (isCurStep === true) curClass = 'current'
      return html`
        <div class="flex-item">
          <div class="stepBt ${curClass}">
            ${sI + 1}
          </div>
        </div>`
    })}
    </div>
    `
}

module.exports = beatBar
