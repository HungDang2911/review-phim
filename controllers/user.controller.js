const bcrypt = require('bcrypt');
const passport = require('passport');
const model = require('../models/user.model');

const saltRounds = 10;

module.exports.getLogin = (req, res) => {
  res.render('users/login');
};

module.exports.getLogout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
};

module.exports.getRegister = async (req, res) => {
  res.render('users/register');
};

module.exports.postRegister = async (req, res) => {
  const { email, username, password } = req.body;

  const hash = await bcrypt.hash(password, saltRounds);
  await model.create(email, username, hash);
  const [[userId]] = await model.getLastInsert();
  req.login(userId, (err) => {
    if (err) throw err;
    res.redirect('/');
  });
};

module.exports.getProfile = async (req, res) => {
  const { userId } = req.user;
  const [[user]] = await model.getById(userId);
  res.render('users/profile', user);
};

passport.serializeUser((userId, done) => {
  done(null, userId);
});

passport.deserializeUser((userId, done) => {
  done(null, userId);
});
