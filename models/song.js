'use strict'
const name = 'song'
const debug = require('debug')('chooBox:' + name)
var extend = require('xtend')
const metro = require('../chooBox/metronaume')
const playTick = metro.playTick
const bpmToMs = metro.bpmToMs
let clock

module.exports = {
  state: {
    /* initial values of state inside the model */
    title: 'ModemLove',
    patterns: [[true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, true, false, false, false, false, false, true, false], [false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false]],
    bpm: 60,
    curTick: 0,
    isPlaying: false,
    version: '0.1.0',
    songDbg: false
  },
  reducers: {
    /* synchronous operations that modify state. Triggered by actions. Signature of (data, state). */
    update: (data, state) => ({ title: 'curTick ' + state.curTick }),
    updatePlay: (data, state) => ({ isPlaying: data }),
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

      newState.patterns[step[0]][step[1]] = !newState.patterns[step[0]][step[1]]
      // newState.bpm = data
      return newState
    },
    toggleDbg: (data, state) => {
      const newState = extend(state)
      newState.songDbg = data
      debug('toggleDbg')
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
      // debug('yarr started',state.patterns[state.curTick])
      const bank = sounds.soundBank

      let lastTick = state.curTick
      if (lastTick === state.patterns[0].length) lastTick = 0
      state.patterns.map((pattern, i) => {
        // if the current step is on
        if (pattern[lastTick] === true) {
          sounds.playSound(bank[i])
        }
      })
      ++lastTick
      send('nextTick', done)
    },
    start: (data, state, send, done) => {
      debug('start called')
      clearInterval(clock)
      send('updatePlay', true, done)
      // not sure if i need the initial step, may be problematic on tempo changes
      // send('nextTick', done)
      clock = setInterval(() => {
        const sounds = metro.audio
        send('playTick', done)
      }, bpmToMs(state.bpm))
    },
    stop: (data, state, send, done) => {
      debug('stop called')
      send('updatePlay', false, done)
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
      metro.init(state, done)
      // autoStart!
      // send('start', state, done)
    }
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
