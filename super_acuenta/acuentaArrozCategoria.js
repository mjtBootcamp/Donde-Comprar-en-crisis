//https://medium.com/@antoharyanto/dynamic-web-scraping-with-puppeteer-nodejs-b35676fd9169
//
const puppeteer = require("puppeteer");
const webRoute = "https://www.acuenta.cl/search?name=arroz&category=78534"; //DINAMIZAR
const { insertProduct } = require("../db/consultas");

const scanAcuenta = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1000, height: 926 });
    await page.goto(webRoute, { waitUntil: "networkidle2" });
    console.log("start evaluate javascript");
    try {
      let prodNames = await page.evaluate(async () => {
        let div = document.querySelectorAll(".fRAese");
        console.log("div", div);
        let productos = [];
        let simboloOferta = { class: "JMKOB", datos: [] };
        let imagenProducto = { class: "prod__figure__img", datos: [] };
        let precioBase = { class: "base__price", datos: [] };
        let nombreProducto = { class: "prod__name", datos: [] };
        let pack = { class: "prod__n-per-price__text", datos: [] };

        div.forEach(async (element) => {
          let producto = {};
          let sale = element.querySelector(`.${simboloOferta.class}`);
          sale != null
            ? (producto.oferta = true)
            : (producto.oferta = false);

          let titleelem = element.querySelector(`.${nombreProducto.class}`);
          titleelem != null
            ? (producto.nombreProducto = titleelem.innerText)
            : (producto.nombreProducto = null);

          let imgelem = element.querySelector(`.${imagenProducto.class}`);
          imgelem != null
            ? (producto.img = imgelem.src)
            : (producto.img = null);

          let priceelem = element.querySelector(`.${precioBase.class}`);
          let a = priceelem.innerText.match(/\d/g);
          let b = a.join("");
          priceelem != null
            ? (producto.precioBase = parseInt(b))
            : (producto.precioBase = null);

          
            let pricepackEl = element.querySelector(`.${pack.class}`);
            if (pricepackEl) {
              let pricePackText = pricepackEl.textContent;
              let unPack = parseInt(
                pricePackText.slice(0, pricePackText.search("X"))
              );
              let pP = pricePackText.slice(
                pricePackText.search("X") + 1,
                pricePackText.length
              );
              let a = pP.match(/\d/g);
              let b = a.join("");
              let pricePack = parseInt(b);
  
              if (pricepackEl) {
                producto.precioPack = {
                  unidades: unPack ? unPack : null,
                  pricePack: pricePack ? pricePack : null,
                  unidad: 0,
                };
                if (unPack && pricePack) {
                  producto.precioPack.unidad = pricePack / unPack;
                }
              }
            }

          productos.push(producto);
        });

        return productos;
      });
      console.log("prodNames ", prodNames);
      prodNames.forEach(async (prod) => {
        if (prod.precioPack != null) {
          console.log("prod :>> ", prod);
        }
        try {
          await insertProduct(prod.nombreProducto, prod.precioBase, prod.img);
        } catch (error) {
          console.log("error query :>> ", error.menssage);
        }
      });
      //browser.close();
    } catch (error) {
      console.log("error pronames :>> ", error);
    }
  } catch (error) {
    console.log("error :>> ", error);
  }
  //return prodNames;
};
scanAcuenta();
