const express = require('express');
const router = express.Router();
const { createShortUrl,getShortUrl } = require('../controllers/shorturl.js');


router.post('/', createShortUrl);
router.get('/:shortUrl', getShortUrl);
module.exports = router;