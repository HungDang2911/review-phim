const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const passport = require('passport');
const userRoute = require('./routes/user.route');

const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', userRoute);


app.get('/', function(req, res) {
    res.render('index', {username: 123});
});

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});
