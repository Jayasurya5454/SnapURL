const express = require("express");
const ShortUrl = require("../models/shorturl");
const QRCode = require("qrcode");

module.exports.createShortUrl = async (req, res) => {
    const { originalUrl, customName} = req.body;
    const shortUrl = customName ? customName : Math.random().toString(36).substr(2, 5);

    try {
        if (customName) {
            const existingCustomName = await ShortUrl.findOne({ shortUrl: customName });
            if (existingCustomName) {
                return res.status(400).json({ message: "Custom name already in use so try another name" });
            }
        }        

        const qrcode = await QRCode.toDataURL(originalUrl);

        const newShortUrl = new ShortUrl({
            originalUrl,
            shortUrl,
            qrcode,
            createdBy: req.user ? req.user._id : null, 
        });

        await newShortUrl.save();

        res.status(201).json({ shortUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports.getShortUrl = async (req, res) => {
    try {
        const { shortUrl } = req.params;

        const shortUrlEntry = await ShortUrl.findOne({ shortUrl });
        if (!shortUrlEntry) {
            return res.status(404).send("Short URL not found");
        }

        shortUrlEntry.clicks++;
        await shortUrlEntry.save();

        res.redirect(shortUrlEntry.originalUrl);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};
