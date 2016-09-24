'use strict'
const name = 'song'
const debug = require('debug')('chooAudio:' + name)
const metro = require('../chooAudio/metronaume')
var extend = require('xtend')
const playTick = metro.playTick
const metronaume = require('../chooAudio/metronaume')
const bpmToMs = metronaume.bpmToMs
let clock

module.exports = {
  state: {
    /* initial values of state inside the model */
    title: 'Da Init song',
    pattern: [
      true, false, true, false,
      false, false, true, false,
      true, false, false, false,
      true, false, false, false
    ],
    bpm: 120,
    curTick: 0,
    metTimer: ''
  },
  reducers: {
    /* synchronous operations that modify state. Triggered by actions. Signature of (data, state). */
    update: (data, state) => ({ title: 'curTick ' + state.curTick }),
    nextTick: (data, state) => {
      const newState = extend(state)
      if (state.curTick === 15) {
        newState.curTick = 0
      } else {
        newState.curTick = newState.curTick + 1

      }
      // debug(newState.curTick % 4)
      if (newState.curTick % 4 === 0) {
        // debug(newState)
      }
      return newState
    },
    toggleStep: (step, state) => {
      const newState = extend(state)
      debug(step, 'clicked')

      newState.pattern[step] = !newState.pattern[step]
      // newState.bpm = data
      return newState
    },
    updateTempo: (data, state) => {
      const newState = extend(state)
      newState.bpm = data
      return newState
    },
    prevTick: (data, state) => {
      const newState = extend(state)
      if (state.curTick === 0) {
        newState.curTick = 15
      } else {
        newState.curTick = newState.curTick - 1
      }
      // debug(newState.curTick % 4)
      if (newState.curTick % 4 === 0) {
        // debug(newState)
      }
      return newState
    }
  },
  effects: {
    // asynchronous operations that don't modify state directly.
    // Triggered by actions, can call actions. Signature of (data, state, send, done)
    playTick: (data, state, send, done) => {
      debug('yarr started',state.pattern[state.curTick])
      if (state.pattern[state.curTick]) {
        sounds.playSound(sounds.ctx,sounds.bufferLoader.bufferList[0])()
      }
      send('nextTick', done)
      debug('state:',state)
    },
    start: (data, state, send, done) => {
      debug('start called')
      clearInterval(clock)
      // not sure if i need the initial step, may be problematic on tempo changes
      // send('nextTick', done)
      clock = setInterval(() => {
        const sounds = metronaume.audio
        send('playTick', done)
      }, bpmToMs(state.bpm))
    },
    stop: (data, state, send, done) => {
      debug('stop called')
      clearInterval(clock)
    },
    changeTempo: (data, state, send, done) => {
      clearInterval(clock)
      let tempo = parseInt(data, 10)
      if (tempo > 400) tempo = 400
      if (isNaN(tempo)) tempo = 120
      debug('changeTempo called', parseInt(data, 10))
      send('updateTempo', tempo, done)

      send('start', state, done)
    },
    initAudio: (data, state, send, done) => {
      metronaume.init(state, done)

      send('start', state, done)
    },
  },
  subscriptions: [
    // asynchronous read-only operations that don't modify state directly.
    // Can call actions. Signature of (send, done).
    /*
    (send, done) => {
      // do stuff
    }
    */
    // function onclick (send) {
    //   document.addEventListener('click', function () {
    //     send('game:click')
    //   })
    // }
  ]
}
