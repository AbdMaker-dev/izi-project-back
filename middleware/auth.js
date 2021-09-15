const jwt = require("jsonwebtoken");
var { status } = require('../utils/status');

const config = process.env;

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers.authorization;
    if (!token) {
        return res.status(status.require).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token.split(' ')[1], config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(status.unauthorized).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;