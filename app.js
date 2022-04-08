const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

const port = 4000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('home');
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.listen(port, () => {
    console.log(`Server running successfully...\nLink for the server:-http://127.0.0.1:${port}`);
})