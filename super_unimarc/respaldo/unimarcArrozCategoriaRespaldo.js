//https://youtu.be/7EXk5nGQBoY
const puppeteer = require("puppeteer");
const webRoute =
  "https://www.unimarc.cl/category/despensa/arroz-y-legumbres/arroz?orderBy=OrderByPriceASC"; //DINAMIZAR
const { insertProduct } = require("../../db/consultas");

const scanUnimarc = async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  try {
    //await page.setViewport({ width: 1000, height: 926 });
    await page.goto(webRoute); //, { waitUntil: "networkidle2" }
    await page.waitForTimeout(2652);
    

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

        let nombres = [];
        let nombreProducto = document.querySelectorAll(
          nombreCompletoProducto.selectorB[0]
        );
        nombreProducto.forEach((n) => {
          nombres.push(n.title ? n.title : null);
        });
        productos.push(nombres);

        let marcas = [];
        let marcaProducto = document.querySelectorAll(
          ".Shelf_brandText__sGfsS"
        );
        marcaProducto.forEach((m) => {
          marcas.push(m.textContent ? m.textContent : null);
        });
        productos.push(marcas);

        let precios = [];
        let preciosElementos = document.querySelectorAll(prBase.selector);
        preciosElementos.forEach((p) => {
          console.log(p.children[0].children[0].textContent);
          let pbp = "";
          let textPrecioBase = 0;
          if (p.children[0].children[0].textContent != undefined) {
            pbp = p.children[0].children[0].textContent;
            let a = pbp.innerText.match(/\d/g);
            let b = a.join("");
            textPrecioBase = parseInt(b);
            precios.push(textPrecioBase);
          } else {
            precios.push(null);
          }
        });
        productos.push(precios);

        let imgsProductos = [];
        let imgElementos = document.querySelectorAll(imagenProducto.selector);
        imgElementos.forEach((img) => {
          imgsProductos.push(img.src != null ? img.src : null);
        });
        productos.push(imgsProductos);

        productos.push(Date.now() / 1000);

        console.log("productos :>> ", productos);

        return productos;
      }, footerScroll);
      await page.waitForTimeout(1256);
      for (let i = 0; i < recuperados[0].length; i++) {
        console.log(
          `P :>> ${recuperados[0][i]} :>> ${recuperados[1][i]} :>> ${recuperados[2][i]} :>> ${recuperados[3][i]} :>> ${recuperados[4][i]}`
        );
      }
      //console.log("recuperados :>> ", recuperados);
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
