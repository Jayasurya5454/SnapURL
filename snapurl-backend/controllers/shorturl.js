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
  
      // Generate QR Code
      const qrcode = await QRCode.toDataURL(originalUrl);
  
      // Hash password if provided
      const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
  
      // Save the new short URL to the database
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
        const { password } = req.body; // Assuming password is sent in the request body
    
        const shortUrlEntry = await ShortUrl.findOne({ shortUrl });
        if (!shortUrlEntry) {
          return res.status(404).send("Short URL not found");
        }
    
        // Check if max clicks exceeded
        if (shortUrlEntry.maxClicks && shortUrlEntry.clicks >= shortUrlEntry.maxClicks) {
            
          return res.status(403).send("This short URL has reached its click limit.");

        }
    
        // Check if password is required and validate it
        if (shortUrlEntry.password) {
          if (!password) {
            return res.redirect('http://localhost:5173/validate');
        }
          const isPasswordValid = await bcrypt.compare(password, shortUrlEntry.password);
          if (!isPasswordValid) {
            return res.status(401).send("Invalid password");
          }
        }
    
        // Increment click count
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

        // Find the short URL entry by customName
        const shortUrlEntry = await ShortUrl.findOne({ shortUrl: customName });
        if (!shortUrlEntry) {
            return res.status(404).json({ message: "Alias not found." });
        }

        // Return the short URL record without sensitive data
        res.status(200).json({
            originalUrl: shortUrlEntry.originalUrl,
            password: shortUrlEntry.password ? true : false, // Indicate if password is set
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
