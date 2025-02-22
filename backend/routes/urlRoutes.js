const express = require("express");
const { createShortUrl, redirectToLongUrl, analytics, getall} = require("../controllers/urlController");

const router = express.Router();

// Route to shorten a URL
router.post("/shorten", createShortUrl);

// Route to redirect to the original URL

router.get("/:shortUrl", redirectToLongUrl);
router.get("/analytics/:shortUrl", analytics);
router.get("/", getall);

module.exports = router;
