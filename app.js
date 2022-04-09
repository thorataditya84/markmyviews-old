const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const ejs = require('ejs')
const app = express()
const bcrypt = require('bcrypt')
const port = 4000
//importing models here;
const { UserInfo } = require('./models/User')
const { cookie } = require('express/lib/response')
//importing models ends here;
app.set('view engine', 'ejs')
//add app.use here;
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(cookieParser())
app.use(express.static('public'))
//app.use ends here;
//get requests;
app.get('/', (req, res) => {
  const { cookies } = req
  if (cookies.UserInfo) res.render('home', { Username: cookies.UserInfo })
  else res.render('home', { Username: null })
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/logout', (req, res) => {
  const { cookies } = req
  res.clearCookie(cookie.UserInfo)
  res.redirect('/')
})

app.get('/category', (req, res) => {
  const { cookies } = req
  if (cookies.UserInfo) res.render('category', { Username: cookies.UserInfo })
  else res.render('category', { Username: null })
})

app.get('/book', (req, res) => {
  res.render('book')
})
//post requests;

app.post('/logout', (req, res) => {
  res.clearCookie('UserInfo')
  res.redirect('/')
})

app.post('/signUp', (req, res) => {
  const FullName = req.body.FullName
  const Username = req.body.Username
  const Email = req.body.Email
  const Password = req.body.Password
  const salt = bcrypt.genSaltSync(+process.env.SALT)
  const hashedPassword = bcrypt.hashSync(Password, salt)
  const signedUpUser = new UserInfo({
    FullName: req.body.FullName,
    Username: req.body.Username,
    Email: req.body.Email,
    Password: hashedPassword
  })
  signedUpUser
    .save()
    .then(data => {
      res.clearCookie('Userinfo')
      res.cookie('UserInfo', [data.Username])
      res.redirect('/')
    })
    .catch(error => {
      res.json(error)
    })
})

app.post('/login', (req, res) => {
  const Username = req.body.Username
  const Password = req.body.Password
  UserInfo.findOne(
    {
      Username: { $eq: Username }
    },
    function (err, User) {
      if (err) return handleError(err)
      if (!User) {
        res.redirect('/')
        console.log('User not found!')
      } else {
        bcrypt.compare(Password, User.Password, function (err, response) {
          if (response) {
            res.clearCookie('UserInfo')
            res.cookie('UserInfo', [User.Username])
            res.redirect('/')
          } else {
            res.redirect('/')
          }
        })
      }
    }
  )
})

//port;
app.listen(port, () => {
  console.log(
    `Server running successfully...\nLink for the server:-http://127.0.0.1:${port}`
  )
})
