/* globals AudioContext */
'use strict'
const name = 'sound'
const debug = require('debug')('chooAudio:' + name)
var BufferLoader = require('./BufferLoader')
var soundArr = []
function Sound () {
  var sound = {}
  sound.init = function (files, cb) {
    sound.ctx = new AudioContext()
    sound.bufferLoader = new BufferLoader(
      sound.ctx,
      files,
      finishedLoading
    )

    sound.bufferLoader.load()
    function finishedLoading (bufferList) {
      sound.inited = true
      cb(bufferList)
    }
  }

  sound.playSound = function (context, soundBuffer, offset) {
    debug('playSound',soundBuffer)
    return function () {
      offset ? offset : 0
      var soundObj = context.createBufferSource()
      soundObj.buffer = soundBuffer
      soundObj.connect(context.destination)
      soundObj.start(offset)
    }
  }

  return sound
}

module.exports = Sound

// function soundLoader
