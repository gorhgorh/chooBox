'use strict'
const name = 'metronaume'
const debug = require('debug')('chooAudio:' + name)



module .exports = {
  init:(thing, cb) => {
    debug('init')
    debug(thing)
    cb()
  },
  bpmToMs:(bpm) => {
    return 60000 / bpm
  },
  playTick : (tick, cb) => {
    debug('playTickCalled')
    debug(tick)
    cb(tick)
  }
}
