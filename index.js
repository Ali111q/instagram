const puppeteer = require('puppeteer');

async function loginToInstagram(username, password) {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.goto('https://www.instagram.com/accounts/login/');

        // Wait for the login form to load
        await page.waitForSelector('form');

        // Type in the username and password
        await page.type('input[name="username"]', username);
        await page.type('input[name="password"]', password);

        // Click the login button
        await page.click('button[type="submit"]');

        // Wait for the page to navigate to the logged-in page
        await page.waitForNavigation();

        // Check if the user is logged in by looking for the logout button
        const logoutButton = await page.$('a[href="/accounts/logout/"]');
        if (logoutButton) {
            console.log('Logged in successfully');
        } else {
            console.log('Failed to log in');
        }

        // await browser.close();
    } catch (err) {
        console.log(err);
    }
}
async function getFollowers(username) {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        // Go to the user's profile page
        await page.goto(`https://www.instagram.com/${username}/`);

        // Wait for the page to load
        await page.waitForSelector('main');

        // Extract the follower count from the page
        const followerCount = await page.$eval('a[href="/username/followers/"] span', el => el.textContent);

        // Click on the follower button
        await page.click('a[href="/username/followers/"]')

        // Wait for the followers modal to open
        await page.waitForSelector('div[role="dialog"]')

        // Extract the followers from the modal
        const followers = await page.$$eval('a[href*="/username/"]', els => els.map(el => el.textContent));

        console.log(`${username} has ${followerCount} followers: ${followers.join(', ')}`);

        await browser.close();
    } catch (err) {
        console.log(err);
    }
}


loginToInstagram('k.5mr', 'Prpr.123');
// getFollowers('k.5mr');
