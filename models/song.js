'use strict'
const name = 'song'
const debug = require('debug')('chooAudio:' + name)
const metro = require('../chooAudio/metronaume')
var extend = require('xtend')
const playTick = metro.playTick
module.exports = {
  state: {
    /* initial values of state inside the model */
    title: 'Da Init song',
    pattern:[
      true,false,true,false,
      false,false,true,false,
      true,false,false,false,
      true,false,false,false
    ],
    bpm: 120,
    curTick: 0
  },
  reducers: {
    /* synchronous operations that modify state. Triggered by actions. Signature of (data, state). */
    update: (data, state) => ({ title: 'curTick ' + state.curTick }),
    start: (data, state) => {
      const newState = extend(state)
      state.timer
      if (state.curTick === 15 ) {
        newState.curTick = 0
      }else {
        newState.curTick = newState.curTick + 1
        debug('newState', newState)
      }
      debug(newState.curTick % 4)
      if (newState.curTick % 4 === 0 ) {
        debug(newState)

      }
      return newState
    },
    nextTick: (data, state) => {
      const newState = extend(state)
      if (state.curTick === 15 ) {
        newState.curTick = 0
      }else {
        newState.curTick = newState.curTick + 1
        debug('newState', newState)
      }
      debug(newState.curTick % 4)
      if (newState.curTick % 4 === 0 ) {
        debug(newState)

      }
      return newState
    },
  },
  effects: {
    // asynchronous operations that don't modify state directly.
    // Triggered by actions, can call actions. Signature of (data, state, send, done)
    playTick: (data, state, send, done) => {
      debug('yarr started')
      playTick(state, (state) => {
        return send('nextTick', state, done  )
      })


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
