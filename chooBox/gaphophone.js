// 'use strict'
require('./libs/audioContextMonkeyPatch')
const name = 'gaphoPhone'
const debug = require('debug')('chooBox:' + name)
debug('start')

function metronome (tempo) {
  const intervale = 60000 / tempo // 1 beat in ms
  debug(intervale)
}
metronome(120)
