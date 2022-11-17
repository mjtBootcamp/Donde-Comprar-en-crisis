//https://youtu.be/7EXk5nGQBoY
const puppeteer = require("puppeteer");
const webRoute =
  "https://www.unimarc.cl/category/despensa/arroz-y-legumbres/arroz?orderBy=OrderByPriceASC"; //DINAMIZAR
const { insertProduct } = require("../db/consultas");

const scanUnimarc = async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  try {
    await page.goto(webRoute); //, { waitUntil: "networkidle2" }
    await page.waitForTimeout(2652);

    console.log("start evaluate javascript");
    try {
      let footerWait = await page.waitForXPath("//*[@id='DropDownClose']");
      let products = await page.evaluate(async (Pageitem) => {
        Pageitem.scrollIntoView();
        let contentProduct = { selector: "div .Shelf_shelf__WM77V" };
        let div = document.querySelectorAll(contentProduct.selector);

        let productos = [];
        let simboloOferta = { class: "JMKOB" };
        let imagenProducto = { selector: ".picture_picture__QMdfM > span > img" };
        let prBase = {
          class: "",
          selector: "div .Shelf_shelf__WM77V > div > div > div > div > div",
          item: {
            0: { precioBase: 0, precioPorUnidad: 2 },
            1: { precioBaseOferta: 0, precioPorUnidadOferta: 2 },
          },
        }; //
        let marcaP = {
          class: "Shelf_brandText__sGfsS",
          selector: "div .Shelf_shelf__WM77V > div > div > a > div > p",
          item: 0,
        }; //
        let nombreCompletoProducto = {
          class: "Shelf_nameProduct__CXI5M",
          selector: "div .Shelf_shelf__WM77V > div > div > a > div > p",
          item: 1,
          selectorB: ["div .Shelf_shelf__WM77V > div > div > a", "title"],
        };

        let cantProducto = {
          class: "Text_text--left__1v2Xw",
          selector: "div .Shelf_shelf__WM77V > div > div > a > div > p",
          item: 2,
        }; //
        let pack = { class: "prod__n-per-price__text" };
        div.forEach(async (element) => {
          let producto = [];
          let n = element.querySelector(nombreCompletoProducto.selectorB[0]);
          producto.push(n.title ? n.title : null);

          let m = element.querySelector(".Shelf_brandText__sGfsS");
          producto.push(m.textContent ? m.textContent : null);

          let preciosElementos = element.querySelector(prBase.selector);
          if (preciosElementos.children[0].children[0].textContent != null) {
            let textoPrecio =
              preciosElementos.children[0].children[0].textContent;
            let a = textoPrecio.match(/\d/g);
            let b = a.join("");
            producto.push(parseInt(b));
            //preciosTextoArr.push(preciosElementos.children[0].children[0].textContent);
          } else {
            producto.push(null);
          }
          /* preciosElementos.forEach((precios) => {
          }); */
          //console.log("preciosElementos :>> ", preciosElementos);
          let img = element.querySelector(imagenProducto.selector);
          producto.push(img.src != null ? img.src : null);

          producto.push(Date.now() / 1000);
          productos.push(producto);
          //console.log("producto :>> ", producto);
        });
        console.log("productos :>> ", productos);

        return productos;
      }, footerWait);
      await page.waitForTimeout(1256);
      console.log("recuperados.length :>> ", products.length);
      /*for (let i = 0; i < recuperados.length; i++) {
        console.log(`P :>> ${recuperados[i][0]} :>> ${recuperados[i][1]} :>> ${recuperados[i][2]} :>> ${recuperados[i][3]} :>> ${recuperados[i][4]}`);
      }*/
      try {
        products.forEach(async (prod) => {
          const nombreTabla = "scanunimarc";
          await insertProduct(nombreTabla, prod);
        });
      } catch (error) {
        console.log("error mysql :>> ", error);
      }
      //browser.close();
    } catch (error) {
      console.log("error pronames :>> ", error);
    }
  } catch (error) {
    console.log("error :>> ", error);
  }
  //return prodNames;
};
scanUnimarc();
