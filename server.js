require('dotenv').config()
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const express = require('express');
const app = express();
const PORT = 2000 || process.env.PORT;

const mongoose = require('mongoose');
const users = require('./models/users.js');
const notes = require('./models/notes.js');
const loginCheck = require('./middleware/authController.js');
const MONGO_DB_URI = process.env.MONGO_DB;

app.use(express.json());
app.use(cookieParser());


mongoose.connect(MONGO_DB_URI).then((data) => {
    console.log("DATABASE CONNECTED")
}).catch((err) => {
    console.log("Error", err.message)
});

app.post('/api/register', async (req, res) => {
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
})

app.post('/api/login', async (req, res) => {
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
})
app.use(loginCheck);
app.post('/api/note/create', async (req, res) => {
    const { title, Content } = req.body;
    try {
        const note = await notes.create({ title, Content, user: req.user });
        res.status(201).json(note);
    } catch (error) {
        console.log(error.message);
        console.log(error.stack)
        res.status(501).json({ message: `Failed to Create your Note right now. Please try again in some time` });
    }
})
app.get('/api/note/notelist', async (req, res) => {
    const note = await notes.find({ user: req.user });
    res.status(200).json(note)
})

app.put('/api/note/:id', async (req, res) => {
    const note = await notes.findByIdAndUpdate(
        { _id: req.params.id, user: req.user }, req.body,
        { new: true }
    )
    res.status(200).json(note)
})
app.delete('/api/note/:title', async (req, res) => {
    try {
        const note = await notes.findOneAndDelete({ "title": req.params.title, user: req.user });
        res.status(201).send("Your Selected note is delted now. Happy!")
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to delete note', error: error.message });
    }
})

app.get('/', (req, res) => {
    res.send("Home Page  Connected")
})


app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`)
})