const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const ejs = require('ejs')
const app = express()
const bcrypt = require('bcrypt')
const port = 4000
//importing models here;
const { UserInfo } = require('./models/User')
const { BookInfo } = require('./models/bookInfo')
//importing models ends here;
const { cookie } = require('express/lib/response')
const req = require('express/lib/request')
app.set('view engine', 'ejs')
// const JsonBookData=require('./public/general.json')
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
var count = 1
app.get('/', (req, res) => {
  const { cookies } = req
  if (cookies.UserInfo)
    res.render('home', {
      Username: cookies.UserInfo,
      message: `Welcome ${cookies.UserInfo}!`,
      count: count++
    })
  else
    res.render('home', {
      Username: null,
      message: 'Please login or signup !',
      count: count++
    })
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

app.get('/books:category', (req, res) => {
  const categorySelected = req.params['category'].replace(':', '')
  const { cookies } = req
  BookInfo.find({ Category: categorySelected })
    .skip(0)
    .limit(1000)
    .then(data => {
      if (cookies.UserInfo)
        res.render('books', {
          Username: cookies.UserInfo,
          Books: data,
          Category: categorySelected
        })
      else
        res.render('books', {
          Username: null,
          Books: data,
          Category: categorySelected
        })
    })
})

app.get('/book', (req, res) => {
  const { cookies } = req
  if ('UserInfo' in cookies) res.render('book', { Username: cookies.UserInfo })
  else {
    res.render('book', { Username: null })
  }
})
//post requests;

app.post('/logout', (req, res) => {
  res.clearCookie('UserInfo')
  res.redirect('/')
  count = 1
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
      count = 1
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
            count = 1
            res.redirect('/')
          } else {
            res.redirect('/')
          }
        })
      }
    }
  )
})

//post request to upload any book;
// app.post('/justdoit', (req, res) => {
//   JsonBookData.map((book)=>{
//     const newBook= new BookInfo({
//       Title:book.title,
//       Author:book.authors,
//       ISBN:book.isbn13,
//       Rating:book.average_rating,
//       Image:`https://covers.openlibrary.org/b/isbn/${book.isbn13}-L.jpg`,
//       Category:"general"
//     })
//     newBook.save();
//   })
// })

//port;
app.listen(port, () => {
  console.log(
    `Server running successfully...\nLink for the server:-http://127.0.0.1:${port}`
  )
})
