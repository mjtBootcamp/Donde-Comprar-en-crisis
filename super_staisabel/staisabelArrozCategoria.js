const puppeteer = require("puppeteer");
const { insertProduct } = require("../db/consultas");

async function scanStaisabel() {
  const browser = await puppeteer.launch({ headless: false }); // for test disable the headlels mode,
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 926 });

  try {
    await page.goto(
      "https://www.santaisabel.cl/busqueda/despensa/arroz-y-legumbres?ft=arroz%201&o=OrderByPriceASC&page=1", //dinamizar arroz 1 (de 1 kilo) de menor a mayor
      {
        waitUntil: "networkidle2",
      }
    );
    console.log("start evaluate javascript");
    try {
      //wait .paginator-slider > .slides
      let paginatorWait = await page.waitForSelector(
        ".paginator-slider > .slides"
      );
      let products = await page.evaluate(async () => {
        const scrollLoadImg = async () =>
          document
            .querySelector(".paginator-slider > .slides")
            .scrollIntoView();
        await scrollLoadImg();

        console.log("Cargada :>> ");
        let div = document.querySelectorAll(".shelf-product-island");
        console.log("div", div); // console.log inside evaluate, will show on browser console not on node console
        let productos = [];
        div.forEach((el) => {
          let producto = [];
          let nombre =
            el.querySelector(".shelf-product-title-text") != null
              ? el.querySelector(".shelf-product-title-text").textContent
              : null;
          producto.push(nombre);

          let marca =
            el.querySelector("a.shelf-product-brand") != null
              ? el.querySelector("a.shelf-product-brand").textContent
              : null;
          producto.push(marca);

          let textoPrecio;
          let precioNormal = "NULL";
          if (el.querySelector("span.product-sigle-price-wrapper")) {
            textoPrecio = el.querySelector(
              "span.product-sigle-price-wrapper"
            ).textContent;
          } else {
            if (el.querySelector("span.price-best")) {
              textoPrecio = el.querySelector("span.price-best").textContent;
            } else {
              textoPrecio = null;
            }
          }
          if (textoPrecio != "$0") {
            let a = textoPrecio.match(/\d/g);
            let b = a.join("");
            precioNormal = parseInt(b);
          } else {
            precioNormal = null;
          }
          producto.push(precioNormal);

          let img =
            el.querySelector("img.lazy-image") != null
              ? el.querySelector("img.lazy-image").src
              : null;
          producto.push(img);
          producto.push(Date.now() / 1000);

          productos.push(producto);
        });

        return productos;
      }, paginatorWait);

      try {
        products.forEach(async (prod) => {
          const nombreTabla = "scansantaisabel";
          await insertProduct(nombreTabla, prod);
        });
      } catch (error) {
        console.log("error mysql :>> ", error);
      }

      browser.close();
    } catch (error) {
      console.log("error evaluate :>> ", error);
    }
  } catch (error) {
    console.log("error goto :>> ", error);
  }
}

scanStaisabel();
