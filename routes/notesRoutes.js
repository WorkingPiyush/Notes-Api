const express = require('express');
const router = express.Router();
const loginCheck = require('../middleware/authCheckMiddleware.js');
const { createNotes, getNotes, updateNote, deleteNote } = require('../controllers/notesController.js')



router.post('/', loginCheck, createNotes)
router.get('/', loginCheck, getNotes)
router.put('/:id', loginCheck, updateNote)
router.delete('/:title', loginCheck, deleteNote)

module.exports = router