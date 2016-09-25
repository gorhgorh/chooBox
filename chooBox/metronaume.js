// 'use strict'
const name = 'metronaume'
const debug = require('debug')('chooBox:' + name)
const Sound = require('./sound')
const _ = require('lodash')

/**
 * play a frequency with a sinwave
 *
 * @param {object} audio context
 * @param {int} frequency of the sinewave
 * @returns
 */
function note (audio, frequency, duration) {
  return function () {
    var duration = duration || 1

    // Create the basic note as a sine wave.  A sine wave produces a
    // pure tone.  Set it to play for `duration` seconds.
    var sineWave = createSineWave(audio, duration)

    // Set the note's frequency to `frequency`.  A greater frequency
    // produces a higher note.
    sineWave.frequency.value = frequency

    // Web audio works by connecting nodes together in chains.  The
    // output of one node becomes the input to the next.  In this way,
    // sound is created and modified.
    chain([

      // `sineWave` outputs a pure tone.
      sineWave,

      // An amplifier reduces the volume of the tone from 20% to 0
      // over the duration of the tone.  This produces an echoey
      // effect.
      createAmplifier(audio, 0.2, duration),

      // The amplified output is sent to the browser to be played
      // aloud.
      audio.destination])
  }
}

const files = [
  '../assets/audio/modem1.mp3',
  '../assets/audio/modem2.mp3',
  '../assets/audio/modem3.mp3',
  '../assets/audio/modem4.mp3',
  '../assets/audio/amen1.mp3',
  '../assets/audio/amen2.mp3',
  '../assets/audio/amen3.mp3',
  '../assets/audio/amen4.mp3',
  '../assets/audio/amen5.mp3'
]

const sounds = Sound()

const soundArr = []
const play = sounds.playSound
const audio = sounds.ctx
function soundCb (sounds) {
  debug('the sounds cb')
  _.each(sounds, function (soundBuffer) {
    soundArr.push(soundBuffer)
  })

  // play(audio, soundArr[0])()
}
window.sounds = sounds

module.exports = {
  audio: sounds,
  soundArr,
  init: (thing, cb) => {
    sounds.init(files, soundCb)
    debug('audio init')
    debug(thing)
    cb()
  },
  bpmToMs: (bpm) => {
    const interval = 60000 / (bpm * 4) // 4/4 rulez ... for NOW
    debug('bpm', bpm, 'interval', interval, 'signature : 4/4')
    return interval
  }
}
