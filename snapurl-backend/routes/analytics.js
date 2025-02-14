const express = require('express');
const { getAnalytics } = require('../controllers/analytics.js');
const router = express.Router();
router.get('/:userId',getAnalytics);
module.exports = router;