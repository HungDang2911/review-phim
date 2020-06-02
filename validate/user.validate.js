const {check, validationResult} = require('express-validator');

module.exports.validateRegister = [ 
        check('username', 'Username can not be empty').notEmpty(),
        check('username', 'Username must be Alphanumeric').isAlphanumeric(),
        check('username', 'Username must be between 6-20 characters long').isLength({ min: 6 , max: 20}),
        check('email', 'Email can not be empty').notEmpty(),
        check('email', 'Invalid email').isEmail(),
        check('password', 'password must be between 6-100 characters long').isLength({ min: 6 , max: 100})
      ]; 

module.exports.validateLogin = [
    check('username', 'username can not be empty').notEmpty(),
    check('password', 'password can not be empty').notEmpty()
]

module.exports.handleErrors = (req, res, next) => {
    const errors = validationResult(req).array();
    if (errors === undefined || errors.length) {
        const errorMessages = errors.map(field => field.msg);
        res.render(`users${req.url}`, {
            errors: errorMessages
        });
        return;
    }
    next();
}