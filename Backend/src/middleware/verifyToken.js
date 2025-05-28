const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET_KEY

const verifyToken = function (req, res, next) {
    try {
        const token = req.cookies.token;
        console.log(token);
    } catch (error) {
        console.log(error)
    }
}

module.exports = verifyToken;