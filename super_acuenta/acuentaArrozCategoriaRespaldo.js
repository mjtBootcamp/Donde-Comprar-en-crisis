//https://medium.com/@antoharyanto/dynamic-web-scraping-with-puppeteer-nodejs-b35676fd9169
//
const puppeteer = require("puppeteer");
const webRoute = "https://www.acuenta.cl/search?name=arroz&category=78534"; //DINAMIZAR
(async () => {
  const browser = await puppeteer.launch({ headless: false }); // for test disable the headlels mode,
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1000, height: 926 });
    await page.goto(webRoute, { waitUntil: "networkidle2" });
    console.log("start evaluate javascript");

    let prodNames = await page.evaluate(async () => {
      //console.log("document :>> ", document);
      let div = document.querySelectorAll(".fRAese");
      console.log("div", div); //No funciona y no funciona definirla afuera de la funcion
      let productos = [];
      let simboloOferta = { class: "kvNwFA", datos: [] };
      let imagenProducto = {
        class: "prod__figure__img",
        datos: [],
      };
      let precioBase = {
        class: "base__price",
        datos: [],
      };
      let nombreProducto = {
        class: "prod__name",
        datos: [],
      };
      div.forEach((element) => {
        let titleelem = element.querySelector(`.${nombreProducto.class}`);
        productos.push(titleelem.innerText);

        let imgelem = element.querySelector(`.${imagenProducto.class}`);
        productos.push(imgelem);

        let priceelem = element.querySelector(`.${precioBase.class}`);
        productos.push(priceelem.innerText);
      });
      //   productos.push(nombreProducto.datos);
      //   productos.push(imagenProducto.datos);
      //   productos.push(precioBase.datos);
      return productos;
    });
    console.log("prodNames ", prodNames);
    browser.close();
  } catch (error) {
    console.log("error :>> ", error);
  }
})();

//   let precioViejo = {
//     class: "prod-crossed-out__price__old",
//     datos: [],
//   };
//   let ahorroDeclarado = {
//     class: "prod-crossed-out__price__special-off",
//     datos: [],
//   };
//   let precioPack = {
//     class: "prod__n-per-price__text",
//     datos: [],
//   };
//   let preciounitario = {
//     class: "sc-ktHwxA",
//     datos: [],
//   };
//   div.forEach((element) => {
//     let priceUnEl = element.querySelector(`.${preciounitario.class}`);
//     if (priceUnEl != null) {
//         preciounitario.datos.push(priceUnEl.innerText);
//     }
//   });
