const express = require('express')
const pengguna = require('../controllers/pengguna')

const router = express.Router()

router.post('/', pengguna.login)

module.exports = router