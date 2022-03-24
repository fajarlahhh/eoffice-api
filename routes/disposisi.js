const express = require('express')
const auth = require('../middlewares/authentication')
const disposisi = require('../controllers/disposisi')

const router = express.Router()
router.use(auth)

router.get('/all', disposisi.all)

module.exports = router