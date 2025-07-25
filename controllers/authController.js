require('dotenv').config()
const users = require('../models/users.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashpasword = await bcrypt.hash(password, 10);
        const userCreate = await users.create({
            username,
            email,
            password: hashpasword
        })
        res.status(200).json({ message: `User created`, userID: userCreate._id });
    } catch (error) {
        console.log(error.message)
        console.log(error.stack)
        res.status(500).json({ error: `User already exist or server has some personla problem with you.` });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    const userLogin = await users.findOne({ username });
    if (!userLogin || !(await bcrypt.compare(password, userLogin.password))) return res.status(401).json({ message: `Invalid Username or password` });
    const token = jwt.sign({ id: userLogin._id }, process.env.JWT_SECRET);
    res.json({
        message: "Login Success",
        token
    });
    // console.log(error.message)
    // console.log(error.stack)
}

module.exports = { login, register };