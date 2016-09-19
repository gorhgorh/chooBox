'use strict'
const name = 'metronaume'
const debug = require('debug')('chooAudio:' + name)



module .exports = {
  init:(thing, cb) => {
    debug('init')
    debug(thing)
    cb()
  },
  playTick : (tick, cb) => {
    debug('playTickCalled')
    debug(tick)
    cb(tick)
  }
}
