/* globals XMLHttpRequest */
var context
var bufferLoader
var audioFiles = []

function BufferLoader (context, urlList, callback) {
  this.context = context
  this.urlList = urlList
  this.onload = callback
  this.bufferList = []
  this.loadCount = 0
}

BufferLoader.prototype.loadBuffer = function (url, index) {
  var request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.responseType = 'arraybuffer'

  var loader = this

  request.onload = function () {
    loader.context.decodeAudioData(
      request.response,
      function (buffer) {
        if (!buffer) {
          console.log('error decoding file data: ' + url)
          return
        }
        loader.bufferList[index] = buffer
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList)
      }
    )
  }

  request.onerror = function () {
    console.log('BufferLoader: XHR error')
  }

  request.send()
}

BufferLoader.prototype.load = function () {
  for (var i = 0; i < this.urlList.length; ++i) {
    this.loadBuffer(this.urlList[i], i)
  }
}

function init () {
  // Fix up prefixing
  var audioBuffers
  var daBuffer = {}
  window.AudioContext = window.AudioContext || window.webkitAudioContext
  context = new AudioContext()

  bufferLoader = new BufferLoader(
    context,
    [
      '../audio/modem1.mp3',
      '../audio/modem2.mp3'
    ],
    finishedLoading
  )

  bufferLoader.load()
  // console.log(bufferLoader)
  console.log('test')
  $('.playSound').click(function () {
    console.log('clicked playSound')
    playAudio(audioFiles[0])
  })
  console.log(bufferLoader.bufferList)

  return {context: context, audioBuffers: bufferLoader}
}

function pushSound (context, soundBuffer) {
  var sound = context.createBufferSource()
  sound.buffer = soundBuffer
  sound.connect(context.destination)

  audioFiles.push(sound)
  console.log(audioFiles)
  return sound
}

function playAudio (audio, offset) {
  offset ? offset : 0
  audio.start(offset)
}

function finishedLoading (bufferList) {
  console.log('bufferList', bufferList)
}

module.exports = init
