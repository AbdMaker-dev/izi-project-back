const jwt = require("jsonwebtoken");

const jwtdecode = (token) => {
    const data = jwt.decode(token);
    return data;
}

module.exports = {
    jwtdecode,
}