const express = require("express");
const ShortUrl = require("../models/shorturl");
const QRCode = require("qrcode");
const bcrypt = require("bcrypt");

module.exports.createShortUrl = async (req, res) => {
    const { originalUrl, customName, password, maxClicks } = req.body;
  
    const shortUrl = customName || Math.random().toString(36).substr(2, 5);
  
    try {
      if (customName) {
        const existingCustomName = await ShortUrl.findOne({ shortUrl: customName });
        if (existingCustomName) {
          return res.status(400).json({ message: "Custom name already in use. Try another name." });
        }
      }
      qrurl  = "https://snappedurl.onrender.com/"+shortUrl;
      const qrcode = await QRCode.toDataURL(qrurl);
  
      const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
  
      const newShortUrl = new ShortUrl({
        originalUrl,
        customName,
        shortUrl,
        password: hashedPassword,
        maxClicks,
        qrcode,
      });
  
      await newShortUrl.save();
  
      res.status(201).json({ shortUrl, qrcode });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports.getShortUrl = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const { password } = req.body; 
    
        const shortUrlEntry = await ShortUrl.findOne({ shortUrl });
        if (!shortUrlEntry) {
          return res.status(404).send("Short URL not found");
        }
    
        if (shortUrlEntry.maxClicks && shortUrlEntry.clicks >= shortUrlEntry.maxClicks) {
            
          return res.status(403).send("This short URL has reached its click limit.");

        }
    
        if (shortUrlEntry.password) {
          if (!password) {
            return res.redirect('http://localhost:5173/validate');
        }
          const isPasswordValid = await bcrypt.compare(password, shortUrlEntry.password);
          if (!isPasswordValid) {
            return res.status(401).send("Invalid password");
          }
        }
    
        shortUrlEntry.clicks++;
        await shortUrlEntry.save();
    
        res.redirect(shortUrlEntry.originalUrl);
      } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
      }
};

module.exports.getShortUrlRecord = async (req, res) => {
    try {
        const { customName } = req.params;

        const shortUrlEntry = await ShortUrl.findOne({ shortUrl: customName });
        if (!shortUrlEntry) {
            return res.status(404).json({ message: "Alias not found." });
        }

        res.status(200).json({
            originalUrl: shortUrlEntry.originalUrl,
            password: shortUrlEntry.password ? true : false, 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
