// Element: tracks
//
// 'use strict'
const name = 'tracks'
const debug = require('debug')('chooBox:' + name)

const html = require('bel')
const sf = require('sheetify')

const prefix = sf('../assets/css/tracks.css')

function tracks (state, prev, send) {
  const patterns = state.patterns
  const coulourArr = ['c1', 'c2', 'c3', 'c4', 'c5']
  const cMax = coulourArr.length
  let curCol = 0
  return html`
    <div class='beatThings ${prefix}'>
    ${patterns.map((track, pI) => {
      const colCode = coulourArr[curCol]
      if (curCol < cMax - 1) ++curCol
      else curCol = 0

      return html`<div class='flex-container  ${colCode}'>
        ${track.map((step, sI) => {
          let curClass = ''
          const isCurStep = (state.curTick === sI) ? true : ''
          if (isCurStep === true) curClass = 'current'
          const checked = (step === true) ? 'stepOn' : ''
          const stepInfo = [pI, sI]
          return html`
          <div class='flex-item'>
            <div class='stepBt ${checked} ${curClass}' onclick=${(e) => send('toggleStep', stepInfo)}>

            </div>
          </div>`
        })}
      </div` })}
    </div>
    `
}

module.exports = tracks
