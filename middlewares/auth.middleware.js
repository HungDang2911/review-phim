const passport = require('passport');

module.exports.requireAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
}

module.exports.redirectIfAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return res.redirect('/');
    next();
}