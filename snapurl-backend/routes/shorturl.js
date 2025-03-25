const express = require('express');
const router = express.Router();
const { createShortUrl, getShortUrl, deleteShortUrl  } = require('../controllers/shorturl.js');

// Get record for alias validation

router.post('/', createShortUrl);
router.get('/:shortUrl', getShortUrl);
router.delete('/:shortUrl', deleteShortUrl);

module.exports = router;
