# chooBox [![built with choo v3](https://img.shields.io/badge/built%20with%20choo-v3-ffc3e4.svg?style=flat-square)](https://github.com/yoshuawuyts/choo)

choo-audio is a test project for me to learn choo, for now the trip is wonderful,
since the framework is really expressive and i can basically hack and patch it like i need.

# TODO

- [ ] rework song models
  - [ ] split model into models
  - [ ] add metadat to tracks and patterns
  - [ ] implement pattern model
- [ ] Pattern Improvements
  - [ ] allow changing pattern size for a song
  - [ ] save / load patterns
- [ ] Time Improvements
  - [ ] allow non 4/4 signatures
  - [ ] bpm tap
  - [ ] bpm sliders
- [ ] tracks improvements
  - [ ] add / remove tracks
  - [ ] sound selection
  - [x] colors
- [ ] Songs improvements
  - [ ] load / save songs to localStorage
  - [ ] import / export song as a string || json || ???

# TO LEARN
- [ ] subscriptions (key, midi, usb, ???)
- [ ] production, export via browserify
- [ ] components / models / etc test strategies (mook)
- [ ] plugin creation (import svg as text would be a good first candidate )

# TO CLARIFY
- best practice for model splitting
- lifecycle of the state, and when / where would previous states backups can happend (undo for free !!!)
