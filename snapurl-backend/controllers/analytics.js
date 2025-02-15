const ShortUrl = require("../models/shorturl");

module.exports.getAnalytics = async (req, res) => {
    const { userId } = req.params;

    try {
        const userUrls = await ShortUrl.find({ createdBy: userId });

        const totalUrls = userUrls.length;
        const totalClicks = userUrls.reduce((sum, url) => sum + url.clicks, 0);
        const averageClicksPerUrl = totalUrls > 0 ? (totalClicks / totalUrls).toFixed(2) : 0;

        // Most clicked URL
        const mostClickedUrl = userUrls.reduce((max, url) => (url.clicks > max.clicks ? url : max), { clicks: 0 });

        // URLs created over time
        const urlsOverTime = userUrls.reduce((acc, url) => {
            const date = new Date(url.createdAt).toLocaleDateString();
            const existing = acc.find(item => item.date === date);
            if (existing) {
                existing.count += 1;
            } else {
                acc.push({ date, count: 1 });
            }
            return acc;
        }, []);

        // Clicks over time
        const clicksOverTime = userUrls.reduce((acc, url) => {
            const date = new Date(url.createdAt).toLocaleDateString();
            const existing = acc.find(item => item.date === date);
            if (existing) {
                existing.clicks += url.clicks;
            } else {
                acc.push({ date, clicks: url.clicks });
            }
            return acc;
        }, []);

        const passwordProtectedUrls = userUrls.filter(url => url.password).length;

        const qrCodeUrls = userUrls.filter(url => url.qrcode).length;

        const detailedUrls = userUrls.map(url => ({
            shortUrl: url.shortUrl,
            originalUrl: url.originalUrl,
            password: url.password || null,
            alias: url.alias,
            qrCode: url.qrcode,
            createdAt: url.createdAt,
            clicks: url.clicks,
            maxClicks: url.maxClicks,
        }));

        res.json({
            stats: {
                totalUrls,
                totalClicks,
                mostClickedUrl: mostClickedUrl.shortUrl || "N/A",
                mostClickedUrlClicks: mostClickedUrl.clicks || 0,
                averageClicksPerUrl,
                passwordProtectedUrls,
                qrCodeUrls,
            },
            urlsOverTime,
            clicksOverTime,
            detailedUrls,
        });
    } catch (error) {
        console.error("Error fetching analytics:", error);
        res.status(500).json({ message: "Error fetching analytics", error });
    }
};
