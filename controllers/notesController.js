require('dotenv').config()
const express = require('express');
const app = express();

const notes = require('../models/notes.js')

const createNotes = async (req, res) => {
    const { title, Content } = req.body;
    try {
        const note = await notes.create({ title, Content, user: req.user });
        res.status(201).json(note);
    } catch (error) {
        console.log(error.message);
        console.log(error.stack)
        res.status(501).json({ message: `Failed to Create your Note right now. Please try again in some time` });
    }
}
const getNotes = async (req, res) => {
    const note = await notes.find({ user: req.user });
    res.status(200).json(note)
}
const updateNote = async (req, res) => {
    const note = await notes.findByIdAndUpdate(
        { _id: req.params.id, user: req.user }, req.body,
        { new: true }
    )
    res.status(200).json(note)
}
const deleteNote = async (req, res) => {
    try {
        const note = await notes.findOneAndDelete({ "title": req.params.title, user: req.user });
        res.status(201).send("Your Selected note is delted now. Happy!")
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to delete note', error: error.message });
    }
}

module.exports = {
    createNotes, getNotes, updateNote, deleteNote
}