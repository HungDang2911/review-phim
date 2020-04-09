const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const passport = require('passport');
const mysql = require('mysql');
const userRoute = require('./routes/user.route');

const port = 3000;

// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "reviewphim"
// })

// con.connect(function(err) {
//     if (err) throw(err);
//     console.log("Connected");
// });

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', userRoute);


app.get('/', function(req, res) {
    res.render('index');
});

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});
