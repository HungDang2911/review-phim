const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const connection = require('./models/dbconnection');
const adminRoute = require('./routes/admin.route');
const userRoute = require('./routes/user.route');
const actorRoute = require('./routes/actor.route');
const movieRoute = require('./routes/movie.route');
const directorRoute = require('./routes/director.route');
const port = process.env.PORT || 3000;
const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
const sessionStore = new MySQLStore(options);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

// Routes
app.use('/admin', adminRoute);
app.use('/users', userRoute);
app.use('/directors', directorRoute);
app.use('/actors', actorRoute);
app.use('/movies', movieRoute);

app.get('/', async (req, res) => {
  const [topRatedMovies] = await connection.execute(
    'SELECT `movieId`,`movieName`,`posterLink` FROM `movies` ORDER BY `imdb` DESC LIMIT 5'
  );
  const [nowPlayingMovies] = await connection.execute(
    'SELECT `movieId`,`movieName`,`posterLink` FROM `movies` ORDER BY `releaseDate` DESC LIMIT 5'
  );
  res.render('index', { topRatedMovies, nowPlayingMovies });
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const [
      [user],
    ] = await connection.execute(
      'SELECT userId, password FROM users WHERE username = ?',
      [username]
    );

    if (!user) return done(null, false);

    const { userId } = user;
    const hash = user.password;

    const isMatched = await bcrypt.compare(password, hash);

    if (isMatched) return done(null, { userId });
    return done(null, false);
  })
);

app.listen(port, function () {
  console.log(`Server listening on port ${  port}`);
});
