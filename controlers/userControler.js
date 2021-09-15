var { status } = require('../utils/status');
const db = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { jwtdecode } = require('../utils/jwtData');

const test = async (req, res) => {
    const token = req.headers.authorization;
    const { id } = jwtdecode(token.split(' ')[1]);
    console.log(id);
    res.status(status.succes).send("Welcome!!!");
}
const singIn = async (req, res) => {
    try {
        const { nom, prenom, email, password, image } = req.body;
        if (!(email && password && nom && prenom)) {
            res.status(status.bad).send("All input is required");
        }
        const oldUser = await db.user.findOne({ where: { email } });
        if (oldUser) {
            return res.status(status.conflict).send("User email Already Exist. Please Login");
        }
        encryptedPassword = await bcrypt.hash(password, 10);
        const user = await db.user.create({
            nom,
            prenom,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });
        user.password = null;
        res.status(status.created).json({ data: user, token: createToken({ id: user.id, email }) });
    } catch (error) {
        console.log(`Error insert ${error}`);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(status.bad).send("All input is required");
        }
        const user = await db.user.findOne({ where: { email } });
        if (user && (await bcrypt.compare(password, user.password))) {
            user.password = null;
            res.status(status.succes).json({ data: user, token: createToken({ id: user.id, email }) });
        } else {
            res.status(status.bad).json("Invalid Credentials");
        }

    } catch (error) {
        console.log(`Error login ${error}`);
    }
}

const createToken = (objt) => {
    console.log(process.env.TOKEN_EXPIRE_TIME);
    const token = jwt.sign(
        objt,
        process.env.TOKEN_KEY,
        {
            expiresIn: process.env.TOKEN_EXPIRE_TIME,
        }
    );
    return token;
}

module.exports = {
    singIn,
    login,
    test
}