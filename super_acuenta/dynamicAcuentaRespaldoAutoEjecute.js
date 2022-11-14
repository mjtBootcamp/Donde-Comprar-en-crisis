//https://medium.com/@antoharyanto/dynamic-web-scraping-with-puppeteer-nodejs-b35676fd9169
//
const puppeteer = require("puppeteer");
const webRoute = "https://www.acuenta.cl/";
(async () => {
  const browser = await puppeteer.launch({ headless: false }); // for test disable the headlels mode,
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1000, height: 926 });
    await page.goto(webRoute, { waitUntil: "networkidle2" });
    console.log("start evaluate javascript");
    let prodNames = await page.evaluate(() => {
      console.log("document :>> ", document);
      let div = document.querySelectorAll(".fRAese");
      console.log("div", div); //No funciona y no funciona definirla afuera de la funcion

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
    //browser.close();
  } catch (error) {
    console.log("error :>> ", error);
  }
})();
