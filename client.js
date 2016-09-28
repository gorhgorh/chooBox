const choo = require('choo')
const app = choo()

app.model(require('./models/song'))

app.router((route) => [
  route('/', require('./pages/tracker')),
  route('/demo', require('./pages/demo'))
])

const tree = app.start()

document.body.appendChild(tree)
