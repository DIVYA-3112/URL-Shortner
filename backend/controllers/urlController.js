const express = require('express');
const shortid = require('shortid');
const Url = require('../models/modelUrl');

const createShortUrl = async (req, res) => {
    const allUrls = await Url.find({});
    const { url } = req.body;
    try {
        const urlCode = shortid.generate();
        Url.create({
            shortId: urlCode,
            originalUrl: url,
        });
        console.log(urlCode);
        res.render('home', { urls: allUrls });
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
};

const redirectToLongUrl = async (req, res) => {
    try {
        console.log(req.params.shortUrl);
        const url = await Url.findOneAndUpdate(
            { shortId: req.params.shortUrl },
            {
                $push: {
                    visited: {
                        timestamp: Date.now(),
                    },
                },
            },
            { new: true }
        );
        console.log(url);
        if (url) {
            return res.redirect(url.originalUrl);
        } else {
            res.status(404).json('No URL fOund');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
};

const analytics = async (req, res) => {
    try {
        const url = await Url.findOne({ shortId: req.params.shortUrl });
        if (url) {
            const totalVisits = url.visited ? url.visited.length : 0;
            res.json({ totalVisits, visited: url.visited });
        } else {
            res.status(404).json('No URL found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
};

const getall = async (req, res) => {
    try {
        const urls = await Url.find();
        console.log(urls);
        res.json(urls);
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
};


module.exports = { createShortUrl, redirectToLongUrl, analytics, getall };