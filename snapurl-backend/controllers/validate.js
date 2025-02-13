const bcrypt = require("bcrypt"); // If passwords are hashed, use bcrypt to compare them.
const ShortUrl = require('../models/shorturl');

module.exports.getShortUrlRecord = async (req, res) => {
    try {
        const { customName } = req.params;
        const { password } = req.query;

        // Find the short URL entry by customName
        const shortUrlEntry = await ShortUrl.findOne({ shortUrl: customName });
        if (!shortUrlEntry) {
            return res.status(404).json({ message: "Alias not found." });
        }

        // If the entry requires a password
        if (shortUrlEntry.password) {
            // Compare passwords (assuming stored password is hashed)
            const isPasswordValid = await bcrypt.compare(password, shortUrlEntry.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid password." });
            }
        }

        // Return the original URL
        res.status(200).json({
            originalUrl: shortUrlEntry.originalUrl,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
