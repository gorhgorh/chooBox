/* globals AudioContext */
// 'use strict'
const name = 'sound'
const debug = require('debug')('chooBox:' + name)
var BufferLoader = require('./BufferLoader')
var soundArr = []
function Sound () {
  var sound = {}
  sound.finishedLoading = function(bufferList, cb) {
    sound.inited = true
  }

  sound.init = function (files, cb) {
    sound.ctx = new AudioContext()
    debug('audioContext built')
    sound.bufferLoader = new BufferLoader(
      sound.ctx,
      files,
      finishedLoading
    )

    sound.playSound = function (soundIndex, offset) {
      const soundBuffers = sound.soundBank
      const maxSound = soundBuffers.length
      if (maxSound === 0) {
        debug('no Sound', soundBuffers)
        return false
      }
      if (soundIndex > maxSound) {
        debug('sound buffer out of buffer array range')
        soundIndex = maxSound
      }
      const soundBuffer = soundBuffers[soundIndex]
      debug('playSound',soundBuffers)
      offset ? offset : 0
      var soundObj = sound.ctx.createBufferSource()
      soundObj.buffer = soundBuffer
      soundObj.connect(sound.ctx.destination)
      soundObj.start(offset)
    }

    sound.bufferLoader.load()
    function finishedLoading (bufferList) {
      debug('soundsInited')
      // debug(bufferList)
      sound.inited = true
      sound.soundBank = bufferList
      // return bufferList
    }
  }

  return sound
}

module.exports = Sound

// function soundLoader
