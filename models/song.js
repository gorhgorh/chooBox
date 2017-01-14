// 'use strict'
const name = 'song'
const debug = require('debug')('chooBox:' + name)
var extend = require('xtend')
const metro = require('../chooBox/metronaume')
const bpmToMs = metro.bpmToMs
let clock

module.exports = {
  state: {
    /* initial values of state inside the model */
    title: 'ModemLove',
    patterns: [
      {
        steps: [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        type: 'sample',
        bufferIndex: 0
      },
      {
        steps: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        type: 'sample',
        bufferIndex: 1
      },
      {
        steps: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        type: 'sample',
        bufferIndex: 2
      },
      {
        steps: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        type: 'sample',
        bufferIndex: 3
      },
      {
        steps: [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],
        type: 'sample',
        bufferIndex: 4
      },
      {
        steps: [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],
        type: 'sample',
        bufferIndex: 5
      },
      {
        steps: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
        type: 'sample',
        bufferIndex: 6
      },
      {
        steps: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        type: 'sample',
        bufferIndex: 7
      },
      {
        steps: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        type: 'sample',
        bufferIndex: 8
      }
    ],
    bpm: 60,
    curTick: 0,
    isPlaying: false,
    version: '0.2.0',
    songDbg: false,
    sampleNames: metro.fileNames
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

      newState.patterns[step[0]].steps[step[1]] = !newState.patterns[step[0]].steps[step[1]]
      debug('clicked', newState.patterns[step[0]].steps[step[1]])
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
    },
    changeSample: (data, state) => {
      const newState = extend(state)
      newState.patterns[data.track].bufferIndex = data.sample
      return newState
    }
  },
  effects: {
    keyPressed: (data, state, send, done) => {
      console.log('keypressed', data)
      if (data === 'Space') {
        send('start', done)
        // console.log('yarrr')
      }
    },
    changeSample: (data, state) => {
      console.log('changeSample', data)
      window.evento = data
    },
    // asynchronous operations that don't modify state directly.
    // Triggered by actions, can call actions. Signature of (data, state, send, done)
    playTick: (data, state, send, done) => {
      // debug('yarr started',state.patterns[state.curTick])
      let lastTick = state.curTick
      if (lastTick === state.patterns[0].steps.length) lastTick = 0
      state.patterns.map((pattern, i) => {
        // if the current step is on
        debug(pattern)
        if (pattern.steps[lastTick] === true) {
          metro.audio.playSound(parseInt(pattern.bufferIndex, 10))
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
    (send, done) => {
      window.addEventListener('keypress', function (e) {
        const key = e.code
        send('keyPressed', key, (err) => {
          if (err) return done(err)
        })
      })
    }
  ]
}
