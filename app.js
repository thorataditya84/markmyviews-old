const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const app = express()
const bcrypt = require('bcrypt')
const port = 4000
//importing models here;
const { UserInfo } = require('./models/User')
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
  res.render('home', { isLoggedin: false, Username: null })
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
      res.render('home', { isLoggedin: true, Username: User.Username })
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
            res.render('home', { isLoggedin: true, Username: User.Username })
          } else {
            res.render('home', { isLoggedin: false, Username: null })
            console.log('User not found!')
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
