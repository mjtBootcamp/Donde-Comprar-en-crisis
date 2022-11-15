const puppeteer = require("puppeteer");
async function getTokoPedia() {
  const browser = await puppeteer.launch({ headless: false }); // for test disable the headlels mode,
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 926 });
  await page.goto(
    "https://www.jumbo.cl/busqueda/despensa/arroz-y-legumbres/arroz?ft=arroz&o=OrderByPriceASC&page=1", //dinamizar arroz 1 (de 1 kilo) de menor a mayor
    {
      waitUntil: "networkidle2",
    }
  );

  console.log("start evaluate javascript");
  /* @type {string[]} */
  let productNames = await page.evaluate(async () => {
    let div = document.querySelectorAll(".shelf-product-title-text");
    console.log("div", div); // console.log inside evaluate, will show on browser console not on node console
    div.forEach((el) => {
      console.log("Elemento", el); //imprime en consola del navegador
    });
    return div;
  });
  console.log(productNames); //undefined

  const cerrar = async () => browser.close();
  //setTimeout(cerrar, 10000);
}

getTokoPedia();
