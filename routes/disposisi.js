const express = require('express')
const auth = require('../middlewares/authentication')
const pengguna = require('../controllers/pengguna')
const disposisi = require('../controllers/disposisi')

const router = express.Router()
router.use(auth)

router.post('/disposisi/all', disposisi.all)

module.exports = router