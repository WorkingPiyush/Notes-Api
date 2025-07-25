require('dotenv').config()
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const PORT = 2000 || process.env.PORT;
const mongoose = require('mongoose');
const MONGO_DB_URI = process.env.MONGO_DB;
// using middlewares for JSON input
app.use(express.json());
app.use(cookieParser());

// connected the DB
mongoose.connect(MONGO_DB_URI).then((data) => {
    console.log("DATABASE CONNECTED")
}).catch((err) => {
    console.log("Error", err.message)
});

// authentication process of the user
const authRoutes = require('./routes/authRoutes.js')
app.use('/api/', authRoutes)
// C.R.U.D. OPERATION with the notes like 
const notesRoute = require('./routes/notesRoutes.js')
app.use('/api/notes/', notesRoute)
app.use('/api/notes/', notesRoute)
app.use('/api/notes/', notesRoute)
app.use('/api/notes/', notesRoute)

// home page stup
app.get('/', (req, res) => {
    res.send("Home Page  Connected")
})

// listening the server
app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`)
})