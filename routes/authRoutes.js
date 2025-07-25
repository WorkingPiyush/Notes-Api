const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController.js')

router.post('/regsiter', register)
router.post('/login', login)

module.exports = router