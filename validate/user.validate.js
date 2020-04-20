const {check, validationResult} = require('express-validator');

module.exports.validateRegister = [ 
        check('username', 'Username can not be empty').notEmpty(),
        check('username', 'Username must be Alphanumeric').isAlphanumeric(),
        check('username', 'Username must contain at least 6 characters').isLength({ min: 6 }),
        check('email', 'Email can not be empty').notEmpty(),
        check('email', 'Invalid email').isEmail(),
        check('password', 'password must contain at least 6 characters').isLength({ min: 6 })
      ]; 

module.exports.validateLogin = [
    check('username', 'username can not be empty').notEmpty(),
    check('password', 'password can not be empty').notEmpty()
]

module.exports.handleErrors = (req, res, next) => {
    let errors = validationResult(req).array();
    if (errors) {
        let errorMessages = errors.map(field => field['msg']);
        res.render(`users${req.url}`, {
            errors: errorMessages
        });
        return;
    }

    next();
}

