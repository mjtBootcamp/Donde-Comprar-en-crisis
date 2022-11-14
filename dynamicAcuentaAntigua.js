//https://medium.com/@antoharyanto/dynamic-web-scraping-with-puppeteer-nodejs-b35676fd9169
const puppeteer = require("puppeteer");
async function getTokoPedia() {
  const browser = await puppeteer.launch({ headless: false }); // for test disable the headlels mode,
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 926 });
  await page.goto("https://www.acuenta.cl/", { waitUntil: "networkidle2" });

  console.log("start evaluate javascript");
  //console.log("document :>> ", document);
  /* @type {string[]} */
  let prodNames = await page.evaluate(() => {
    console.log("document :>> ", document);
    let div = document.querySelectorAll(".fRAese");
    console.log("div", div); // console.log inside evaluate, will show on browser console not on node console

    let productnames = [];
    div.forEach((element) => {
      let titleelem = element.querySelector(".prod__name");
      if (titleelem != null) {
        productnames.push(titleelem.textContent);
      }
    });

    return productnames;
  });

  console.log("prodNames ", prodNames);
  browser.close();
}

getTokoPedia();
