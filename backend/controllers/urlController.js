const express = require('express');
const shortid = require('shortid');
const Url = require('../models/modelUrl');

const createShortUrl = async (req, res) => {
    const { url } = req.body;
    try {
        const urlCode = shortid.generate();
        Url.create({
            shortId: urlCode,
            originalUrl: url,
        });
        console.log(urlCode);
        res.json(url);
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
};

const redirectToLongUrl = async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code });
        console.log(url);
        if (url) {
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json('No URL found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
};

module.exports = { createShortUrl, redirectToLongUrl };