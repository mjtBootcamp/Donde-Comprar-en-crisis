const puppeteer = require("puppeteer");
//const {precioPack,precioDescuento,precioNormal} = require("./procesamientoLider");
const webRoute =
  "https://www.lider.cl/supermercado/search?query=arroz&page=1&hitsPerPage=16";
const { insertProduct,insertProductID } = require("../db/consultas");
const scanLider = async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  try {
    await page.goto(webRoute); //, { waitUntil: "networkidle2" }
    await page.waitForTimeout(2652);

    console.log("start evaluate javascript");
    try {
      let paginatorWait = await page.waitForSelector(
        "div.pagination-container"
      );
      let products = await page.evaluate(async (Pageitem) => {
        Pageitem.scrollIntoView();

        let div = document.querySelectorAll("li.ais-Hits-item");
        console.log("div :>> ", div);

        //funciones
        const textToInt = (text) => {
          let a = text.match(/\d/g);
          let b = a.join("");
          let int = parseInt(b);
          return int;
        };
        //funciones

        let productos = [];
        div.forEach(async (element) => {
          let producto = [];
          //id
          let idP = element.querySelector(
            "div > div > a"
          )?.href??null;
          let idProducto = null;
          if(idP!=null){
            let textArr = idP.split("/");
            idProducto = textToInt(textArr[6]);
          }
            
          //Nombre
          let nombre = element.querySelector(
            "div.product-card_description-wrapper > div > :nth-child(1)"
          ).innerText;
          //Marca
          let marca = element.querySelector(
            "div.product-card_description-wrapper > div > :nth-child(2)"
          ).innerText;
          //Precios
          let precioEfectivo = 0;
          let precioNormal = null;
          let precioDescuento = null;
          let descuento = null;
          let cantPack = null;
          let precioPack = null;
          let textPrecios = element.querySelector(
            "div.product-card__sale-price"
          ).innerText;
          if (textPrecios.search(" x ") == -1) {
            if (textPrecios.search("%") == -1) {
              //precio normal
              precioNormal = textToInt(textPrecios);
              precioEfectivo = precioNormal;
            } else {
              //precio con descuento
              let textArr = textPrecios.split("\n");
              precioDescuento = textToInt(textArr[0]);
              descuento = textToInt(textArr[1]);
              precioEfectivo = precioDescuento;
            }
          } else {
            //precios pack
            let textArr = textPrecios.split(" x ");
            cantPack = textToInt(textArr[0]);
            precioPack = textToInt(textArr[1]);
            precioEfectivo = precioPack / cantPack;
          }
          //Imagen
          let img = element.querySelector("img#lazy-img");
          let srcImg = img?.src;
          //fecha
          producto.push(
            idProducto,
            nombre,
            marca,
            precioEfectivo,
            srcImg,
            Date.now() / 1000
          );
          productos.push(producto);
        });

        return productos;
      }, paginatorWait);
      console.log("products :>> ", products);
      try {
        products.forEach(async (prod) => {
          const nombreTabla = "scanlider";
          await insertProductID(nombreTabla, prod);
        });
      } catch (error) {
        console.log("error mysql :>> ", error);
      }
      browser.close();
    } catch (error) {
      console.log("error pronames :>> ", error);
    }
  } catch (error) {
    console.log("error :>> ", error);
  }
  //return prodNames;
};
scanLider();

