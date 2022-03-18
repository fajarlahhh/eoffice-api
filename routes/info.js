const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('E-Office PT Air Minum Giri Menang')
});

module.exports = router;