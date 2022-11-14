/* 
Código fuente original obtenido de este excelente artículo:
https://ifgeekthen.nttdata.com/es/web-scraping-con-javascript-y-nodejs
*/

const puppeteer = require("puppeteer");
const jsdom = require("jsdom");

(async () => {
  try {
    // Abrimos una instancia del puppeteer y accedemos a la url de google
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto(
      "https://www.lider.cl/supermercado/search?query=arroz&page=1&hitsPerPage=16"
    );
    const body = await response.text();

    // Creamos una instancia del resultado devuelto por puppeter para parsearlo con jsdom
    const {
      window: { document },
    } = new jsdom.JSDOM(body);

    // Seleccionamos los títulos y lo mostramos en consola
    document
      .querySelectorAll("div")
      .forEach((element) => console.log(element.textContent));

    // Cerramos el puppeteer
    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
