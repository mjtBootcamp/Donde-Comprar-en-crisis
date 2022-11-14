const puppeteer = require("puppeteer");
const { scrollPageToBottom } = require("puppeteer-autoscroll-down");

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto(
  "https://www.lider.cl/supermercado/search?query=arroz&page=1&hitsPerPage=16",
  { waitUntil: "networkidle2" }
);

let isLoadingAvailable = true; // Your condition-to-stop

while (isLoadingAvailable) {
  await scrollPageToBottom(page, { size: 500 });
  await page.waitForResponse(
    (response) =>
      response.url() ===
        "https://www.lider.cl/supermercado/search?query=arroz&page=1&hitsPerPage=16" &&
      response.status() === 200
  );
  isLoadingAvailable = false; // Update your condition-to-stop value
}

await browser.close();
