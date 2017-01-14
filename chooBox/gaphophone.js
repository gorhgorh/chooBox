/* global AudioContext, Worker */
require('./libs/audioContextMonkeyPatch')
const h = require('hyperscript')

const name = 'gaphoPhone'
const debug = require('debug')('chooBox:' + name)
const BufferLoader = require('./BufferLoader')
debug('start')

const context = new AudioContext()

function playStuff () {
  playSound(context, buffers.bufferList[0], 0)
}

const buffers = new BufferLoader(context, ['./amen1.mp3'], () => {
  // playStuff()
})
// function metronome (tempo, func) {
//   const intervale = 60000 / tempo // 1 beat in ms
//   debug(intervale)
//   return setInterval(func, intervale)
// }
// function inter () {
//   debug('yo')
// }
// metronome(120, inter)
const playSound = function (context, soundBuffer, offset) {
  offset = offset || 0
  var soundObj = context.createBufferSource()
  soundObj.buffer = soundBuffer
  soundObj.connect(context.destination)
  soundObj.start(offset)
}

const pattern = [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false]

const song = {
  tempo: 120,
  pattern
}

const tempo = song.tempo

function init () {
  buffers.load()
  const timerWorker = new Worker('./gaphoWorker.js')

  timerWorker.onmessage = function (e) {
    if (e.data === 'tick') {
      console.log("tick!")
    } else console.log('message: ' + e.data)
  }
  timerWorker.postMessage({'interval': 25.0})
  // timerWorker.postMessage('start')
}
init()

var nextNoteTime = 0
var current16thNote

function nextNote () {
  // Advance current note and time by a 16th note...
  var secondsPerBeat = 60.0 / tempo // Notice this picks up the CURRENT
  // tempo value to calculate beat length.
  nextNoteTime += 0.25 * secondsPerBeat // Add beat length to last beat time

  current16thNote++; // Advance the beat number, wrap to zero
  if (current16thNote == 16) {
    current16thNote = 0
  }
}

const slider =
  h('div#slider',
    h('input', {type: 'range',
      value: 15,
      max: 50,
      min: 0,
      step: 5,
      onchange: function (e) {
        console.log(e.srcElement.value)
        e.preventDefault()
      }
    }))

document.body.appendChild(slider)
// <input type="range" value="15" max="50" min="0" step="5">
