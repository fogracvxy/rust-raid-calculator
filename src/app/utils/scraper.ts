// import puppeteer from "puppeteer";
// import { faker } from "@faker-js/faker";

// function delay(time) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, time);
//   });
// }

// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// export const scrapeData = async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//     executablePath: "C:/Program Files (x86)/chrome-win/chrome.exe",
//     args: ["--no-sandbox", "--disable-dev-shm-usage"],
//   });
//   const page = await browser.newPage();

//   // Set a random user-agent string
//   const userAgent = faker.internet.userAgent();
//   await page.setUserAgent(userAgent);
//   console.log(userAgent);
//   try {
//     // Navigate to the target website
//     await page.goto("https://stats.moose.gg/", {
//       waitUntil: "domcontentloaded",
//     });

//     // Wait for the Cloudflare challenge to appear, with a longer timeout
//     const cfChallengeSelector = "#cf-challenge-form";
//     const cfChallengeTimeout = 120000; // 2 minutes
//     await page.waitForSelector(cfChallengeSelector, {
//       timeout: cfChallengeTimeout,
//     });

//     // Handle the Cloudflare challenge
//     console.log("Cloudflare challenge detected. Solving...");

//     // Simulate human-like behavior
//     const minDelay = 1000; // 1 second
//     const maxDelay = 5000; // 5 seconds
//     const randomDelay = getRandomInt(minDelay, maxDelay);
//     await delay(randomDelay);
//     await page.evaluate(() => {
//       window.scrollBy(0, window.innerHeight / 2);
//     });

//     // Move the mouse cursor randomly
//     const viewportWidth = page.viewport()?.width;
//     const viewportHeight = page.viewport()?.height;
//     const randomX = getRandomInt(0, viewportWidth);
//     const randomY = getRandomInt(0, viewportHeight);
//     await page.mouse.move(randomX, randomY);

//     // If a specific challenge element is present, interact with it
//     const challengeButtonSelector = "#cf-challenge-form button";
//     if (await page.$(challengeButtonSelector)) {
//       await page.click(challengeButtonSelector);
//     }

//     // Wait for navigation after solving the challenge
//     await page.waitForNavigation({ waitUntil: "domcontentloaded" });

//     // ... (rest of your scraping code)
//   } catch (error) {
//     console.error("Error scraping data:", error);
//     return [];
//   } finally {
//     // Close the browser after scraping is complete
//     await browser.close();
//   }
// };
