const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/send-bots', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send('Please provide a valid URL.');
    }

    try {
        // بدء 1000 بوت
        const botCount = 1000;
        const bots = [];
        
        for (let i = 0; i < botCount; i++) {
            bots.push(runBot(url, i));
        }

        await Promise.all(bots);  // انتظار جميع الروبوتات لإنهاء العمل

        res.send(`Successfully sent 1000 bots to ${url}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending bots.');
    }
});

// وظيفة لتشغيل الروبوت
async function runBot(url, botNumber) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    console.log(`Bot ${botNumber} is visiting ${url}`);
    await page.goto(url);
    await page.waitForTimeout(60000);  // يبقى البوت لمدة دقيقة

    await browser.close();
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
