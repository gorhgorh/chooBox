/* globals AudioContext */
'use strict'
const name = 'sound'
const debug = require('debug')('chooBox:' + name)
var BufferLoader = require('./BufferLoader')
var soundArr = []
function Sound () {
  var sound = {}
  sound.finishedLoading = function(bufferList, cb) {
    sound.inited = true
    cb(bufferList)
  }

  sound.init = function (files, cb) {
    sound.ctx = new AudioContext()
    sound.bufferLoader = new BufferLoader(
      sound.ctx,
      files,
      finishedLoading
    )
    sound.playSound = function (soundBuffer, offset) {
      debug('playSound', soundBuffer)
      return function () {
        offset ? offset : 0
        var soundObj = sound.ctx.createBufferSource()
        soundObj.buffer = soundBuffer
        soundObj.connect(sound.ctx.destination)
        soundObj.start(offset)
      }
    }

    sound.bufferLoader.load()
    function finishedLoading (bufferList) {
      sound.inited = true
      cb(bufferList)
    }
  }


  return sound
}

module.exports = Sound

// function soundLoader
