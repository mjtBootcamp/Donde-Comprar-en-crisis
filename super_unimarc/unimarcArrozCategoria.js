//https://youtu.be/7EXk5nGQBoY
const puppeteer = require("puppeteer");
const webRoute =
  "https://www.unimarc.cl/category/despensa/arroz-y-legumbres/arroz?orderBy=OrderByPriceASC"; //DINAMIZAR
const { insertProduct } = require("../db/consultas");

const scanUnimarc = async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  try {
    //await page.setViewport({ width: 1000, height: 926 });
    await page.goto(webRoute); //, { waitUntil: "networkidle2" }
    await page.waitForTimeout(2652);
    //let footerScroll = page.waitForSelector("#DropDownClose");

    console.log("start evaluate javascript");
    try {
      let footerScroll = await page.waitForXPath("//*[@id='DropDownClose']");
      let recuperados = await page.evaluate(async (Pageitem) => {
        Pageitem.scrollIntoView();

        let productos = [];

        let contentProduct = { selector: "div .Shelf_shelf__WM77V" };
        let simboloOferta = { class: "JMKOB" };
        let imagenProducto = { selector: ".picture_picture__QMdfM > img" };
        let prBase = {
          class: "",
          selector: "div .Shelf_shelf__WM77V > div > div > div > div > div",
          item: {
            0: { precioBase: 0, precioPorUnidad: 2 },
            1: { precioBaseOferta: 0, precioPorUnidadOferta: 2 },
          },
        }; //
        let marcaProducto = {
          class: "Shelf_brandText__sGfsS",
          selector: "div .Shelf_shelf__WM77V > div > div > a > div > p",
          item: 0,
        }; //
        let nombreComletoProducto = {
          class: "Shelf_nameProduct__CXI5M",
          selector: "div .Shelf_shelf__WM77V > div > div > a > div > p",
          item: 1,
          selectorB: ["div .Shelf_shelf__WM77V > div > div > a", "title"],
        };
        let nombreProducto = {
          class: "div .Shelf_shelf__WM77V > div > div > a",
        }; //title
        let cantProducto = {
          class: "Text_text--left__1v2Xw",
          selector: "div .Shelf_shelf__WM77V > div > div > a > div > p",
          item: 2,
        }; //
        let pack = { class: "prod__n-per-price__text" };

        let imgElementos = document.querySelectorAll(imagenProducto.selector);
        imgElementos.forEach((img) => {
          productos.push(img.src != null ? img.src : null);
        });
        let preciosElementos = document.querySelectorAll(prBase.selector);
        preciosElementos.forEach((precios) => {
          precios.children[0].children[0].textContent;
        });
        ///CONTINUAR

        console.log("productos :>> ", productos);

        return productos;
      }, footerScroll);
      await page.waitForTimeout(1256);
      console.log("recuperados :>> ", recuperados); //no sale de evaluate
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
