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
      let simboloOferta = { class: "kvNwFA", datos: [] };
      let imagenProducto = {
        class: "prod__figure__img",
        datos: [],
      };
      let precioBase = {
        class: "base__price",
        datos: [],
      };
      let precioViejo = {
        class: "prod-crossed-out__price__old",
        datos: [],
      };
      let ahorroDeclarado = {
        class: "prod-crossed-out__price__special-off",
        datos: [],
      };
      let precioPack = {
        class: "prod__n-per-price__text",
        datos: [],
      };
      let preciounitario = {
        class: "sc-ktHwxA",
        datos: [],
      };
      let nombreProducto = {
        class: "prod__name",
        datos: [],
      };

      div.forEach((element) => {
        let titleelem = element.querySelector(`.${nombreProducto.class}`);
        if (titleelem != null) {
          nombreProducto.datos.push(titleelem.textContent);
        }
      });

      //return Promise.resolve(productnames);
      return nombreProducto.datos;
    });
    console.log("prodNames ", prodNames);
    browser.close();
  } catch (error) {
    console.log("error :>> ", error);
  }
})();
