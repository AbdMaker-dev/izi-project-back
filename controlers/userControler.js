var { status } = require('../utils/status');
const db = require('../models/index');
const bcrypt = require('bcryptjs');

const singIn = async (req, res) => {
    try {
        const { nom, prenom, email, password, image } = req.body;
        if (!(email && password && nom && prenom)) {
            res.status(status.bad).send("All input is required");
        }
        const oldUser = await db.user.findOne({ email });
        if (oldUser) {
            return res.status(status.conflict).send("User Already Exist. Please Login");
        }
        encryptedPassword = await bcrypt.hash(password, 10);
        const user = await db.user.create({
            nom,
            prenom,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });
        user.token = createToken({ id: user._id, email });
        res.status(status.created).json(user);
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
        const user = await db.user.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            user.token = createToken({ id: user._id, email });
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (error) {
        console.log(`Error login ${error}`);
    }
}

const createToken = (objt) => {
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
    login
}