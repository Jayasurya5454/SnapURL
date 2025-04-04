const bcrypt = require("bcrypt"); 
const ShortUrl = require('../models/shorturl');

module.exports.getShortUrlRecord = async (req, res) => {
    try {
        const { customName } = req.params;
        const { password } = req.query;

        const shortUrlEntry = await ShortUrl.findOne({ shortUrl: customName });
        if (!shortUrlEntry) {
            return res.status(404).json({ message: "Alias not found." });
        }

        if (shortUrlEntry.password) {
            const isPasswordValid = await bcrypt.compare(password, shortUrlEntry.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid password." });
            }
        }

        if (shortUrlEntry.maxClicks && shortUrlEntry.clicks >= shortUrlEntry.maxClicks) {
            return res.status(403).json({ message: "Click limit exceeded." });
        }

        shortUrlEntry.clicks += 1;
        await shortUrlEntry.save();

        res.status(200).json({
            originalUrl: shortUrlEntry.originalUrl,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
