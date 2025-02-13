const express = require('express');
const router = express.Router();
const { getShortUrlRecord } = require('../controllers/validate.js');

router.get('/:customName', getShortUrlRecord);

module.exports = router;