const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const app = express()
const bcrypt = require('bcrypt')
const saltRounds = 10
const myPlaintextPassword = 's0//P4$$w0rD'
const port = 4000
//importing models here;
const { UserInfo } = require('./models/Signup')
//importing models ends here;
app.set('view engine', 'ejs')

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(express.static('public'))
//get requests;
app.get('/', (req, res) => {
  res.render('home')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/category', (req, res) => {
  res.render('category')
})

app.get('/book', (req, res) => {
  res.render('book')
})
//post requests;

app.post('/signUp', (req, res) => {
  const FullName = req.body.FullName
  const Username = req.body.Username
  const Email = req.body.Email
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(req.body.Password, salt)
  const signedUpUser = new UserInfo({
    FullName: req.body.FullName,
    Username: req.body.Username,
    Email: req.body.Email,
    Password: hash
  })
  signedUpUser
    .save()
    .then(data => {
      res.redirect('/')
    })
    .catch(error => {
      res.json(error)
    })
})

//port;
app.listen(port, () => {
  console.log(
    `Server running successfully...\nLink for the server:-http://127.0.0.1:${port}`
  )
})
