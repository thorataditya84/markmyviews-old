const express = require('express')
const app = express()
const port = 4000
app.use('/public', express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/category', (req, res) => {
  res.render('category')
})

app.listen(port, () => {
  console.log(
    `Server running successfully...\nLink for the server:-http://127.0.0.1:${port}`
  )
})
