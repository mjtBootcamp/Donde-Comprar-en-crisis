/* 
Código fuente original obtenido de este excelente artículo:
https://ifgeekthen.nttdata.com/es/web-scraping-con-javascript-y-nodejs
*/
const fs = require("fs");
const fsPromises = require("fs").promises;
const puppeteer = require("puppeteer");
const jsdom = require("jsdom");
const PAGEDOM = "https://www.acuenta.cl/search?";
//querys
const categoria = { legumbre: 78534 };
const productoQuery = [
  {
    nombre: ["arroz", "1kg"],
    categoria: categoria.legumbre,
  },
];
const arroz1KG = `name=${productoQuery[0].nombre[0]}%20${productoQuery[0].nombre[1]}`;
const categoriaQuery = `&category=${categoria.legumbre}`;
(async () => {
  try {
    // Variable para manejar si se levanta GUI
    const notGUI = false;
    // Abrimos una instancia del puppeteer y accedemos a la url de google
    const browser = await puppeteer.launch({ headless: notGUI });
    const page = await browser.newPage();
    const response = await page.goto(PAGEDOM + arroz1KG + categoriaQuery);
    const body = await response.text();

    // Creamos una instancia del resultado devuelto por puppeter para parsearlo con jsdom
    const document = new jsdom.JSDOM(body);
    console.log("document :>> ", document);
    console.log("typeof document :>> ", typeof document);
    //Datos
    let datosProducto = {
      nombres: "prod__name",
      precios: "base__price",
      img: "prod__figure__img",
    };

    // Seleccionamos los títulos y lo mostramos en consola
    //document.querySelectorAll('.g h3')
    //    .forEach(element => console.log(element.textContent));

    // let a = document.querySelectorAll("[data-testid]");
    // //document.querySelectorAll("[data-foo='1']")
    // let da = document;
    // console.log("document :>> ", document);
    // console.log("a.length :>> ", a.length);
    // let elPrecios = Array.from(a);
    // console.log("elPrecios :>> ", elPrecios);
    // let elNombres = document.getElementsByClassName(datosProducto.nombres);
    // let elImg = document.getElementsByClassName(datosProducto.img);
    // let precios = elPrecios.map((e) => precios.push(e.innerText));
    // console.log("precios[0] :>> ", precios[0]);

    //RECOGIENDO EL DOM
    await fsPromises.writeFile("window.html", body);
    // console.log("document :>> ", document);
    // console.log("typeof document :>> ", typeof document);

    //await fsPromises.writeFile("document.txt", documentA);
    // Si se levantó GUI espera 2 segundos adicionales para ver la GUI antes que se cierre
    if (!notGUI) {
      console.log("levanta GUI");
      //await new Promise(r => setTimeout(r, 4000));
    }

    // Cerramos el puppeteer
    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
