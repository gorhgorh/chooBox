// Element: tracks
//
// 'use strict'
const name = 'tracksInfos'
const debug = require('debug')('chooBox:' + name)

const html = require('bel')
// const sf = require('sheetify')

// const prefix = sf('../assets/css/tracks.css')



function tracks (sNames, trackIndex,cVal, send) {
  return html`
    <div class="flexItem trackInfoCont ">
      <select name="select" onchange=${(e) => send('changeSample', {sample: e.srcElement.value, track: trackIndex})}>

        ${sNames.map((name, pI) => {
          const isSelected = (cVal === pI) ? 'selected' : ''
          return html`<option value="${pI}" ${isSelected}>${name}</option>`})
        }
      </select>
    </div>`
}

module.exports = tracks
