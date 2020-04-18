const {check, validationResult} = require('express-validator');

module.exports.postCreate = function (req, res, next) {
    console.log(req.body.username);
    console.log(req.body.password);
    check(req.body.username).notEmpty().withMessage("User name can not be empty");
    check(req.body.password).notEmpty().withMessage("Password can not be empty");

    let errors = validationResult(req)['errors'];

    if (errors) {
        console.log(errors);
    }

    next();
}