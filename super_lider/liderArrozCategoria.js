const puppeteer = require("puppeteer");
async function getTokoPedia() {
  const browser = await puppeteer.launch({ headless: false }); // for test disable the headlels mode,
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 926 });
  await page.goto(
    "https://www.lider.cl/supermercado/search?query=arroz&page=1&hitsPerPage=16",
    {
      //https://www.lider.cl/supermercado/search?query=arroz&page=1&hitsPerPage=16
      //timeout: 20000,
      waitUntil: "networkidle2",
    }
  );

  console.log("start evaluate javascript");
  /* @type {string[]} */
  const sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
      console.log("sleep :>> ", ms);
    });
  };
  let productNames = await page.evaluate(() => {
    (() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 10000);
        console.log("sleep :>> ", 10000);
      });
    })();
    let div = document.querySelectorAll("div");
    console.log("div", div); // console.log inside evaluate, will show on browser console not on node console
    div.forEach((el) => {
      console.log("Elemento", el); //imprime en consola del navegador
    });
    return div;
  });
  console.log(productNames);

  const cerrar = async () => browser.close();
  //setTimeout(cerrar, 10000);
}

getTokoPedia();
