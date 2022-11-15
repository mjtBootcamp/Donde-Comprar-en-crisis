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
        let imagenProducto = { class: "prod__figure__img" };
        let precioBase = { class: "base__price" };
        let marcaProducto = { class: "Shelf_brandText__sGfsS" }; //
        let nombreProducto = { class: "Shelf_nameProduct__CXI5M" }; //
        let cantProducto = { class: "Text_text--left__1v2Xw" }; //
        let pack = { class: "prod__n-per-price__text" };

        let cont = document.querySelectorAll(contentProduct.selector);
        console.log("cont :>> ", cont);
        productos.push(cont[0]);
        console.log("productos :>> ", productos);

        return productos;
      }, footerScroll);
      await page.waitForTimeout(1256);
      console.log("recuperados :>> ", recuperados);//no sale de evaluate
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
