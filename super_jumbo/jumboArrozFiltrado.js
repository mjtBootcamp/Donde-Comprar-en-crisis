const puppeteer = require("puppeteer");
async function getTokoPedia() {
  const browser = await puppeteer.launch({ headless: false }); // for test disable the headlels mode,
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1000, height: 926 });
    await page.goto(
      "https://www.jumbo.cl/busqueda/despensa/arroz-y-legumbres/arroz?ft=arroz&o=OrderByPriceASC&page=1", //dinamizar arroz 1 (de 1 kilo) de menor a mayor
      {
        waitUntil: "networkidle2",
      }
    );

    console.log("start evaluate javascript");
    try {
      let productNames = await page.evaluate(async () => {
        let div = document.querySelectorAll(".shelf-product-title-text");
        console.log("div", div); // console.log inside evaluate, will show on browser console not on node console

        let productos = [];
        let simboloOferta = { class: "product-flag oferta" };
        let imagenProducto = { class: "lazy-image" };
        let precioBase = { class: "product-sigle-price-wrapper" };
        let precioAntiguo={class:"price-product-value"};
        let precioOfertas = { class: "price-best" };
        let cantXpor={class:"price-product-best price-promotion-mxn"}
        let nombreProducto = { class: "shelf-product-title-text" };
        let pack = { class: "price-product-best price-promotion-mxn" };

        div.forEach(async (element) => {
          let producto = {};
          let sale = element.querySelector(`.${simboloOferta.class}`);
          sale != null ? (producto.oferta = true) : (producto.oferta = false);

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
      console.log(productNames); //undefined
      const cerrar = async () => browser.close();
      //setTimeout(cerrar, 10000);
    } catch (error) {
      console.log("error evaluate :>> ", error);
    }
  } catch (error) {
    console.log("error goto", error);
  }
}

getTokoPedia();
