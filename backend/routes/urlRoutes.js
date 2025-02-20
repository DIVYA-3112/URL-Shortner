const express = require('express');
const { createShortUrl, redirectToLongUrl } = require("../controllers/urlController");

const router = express.Router();

// Route to shorten a URL
router.post('/shorten', createShortUrl);

// Route to redirect to the original URL
router.get('/:shortUrl', redirectToLongUrl);

module.exports = router;