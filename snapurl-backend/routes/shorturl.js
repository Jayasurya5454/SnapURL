const express = require('express');
const router = express.Router();
const { createShortUrl, getShortUrl} = require('../controllers/shorturl.js');

// Get record for alias validation

router.post('/', createShortUrl);
router.get('/:shortUrl', getShortUrl);

module.exports = router;
