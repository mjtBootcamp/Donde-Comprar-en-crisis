const puppeteer = require("puppeteer");
const fsPromises = require("fs").promises;
const webRoute =
  "https://www.lider.cl/supermercado/search?query=arroz&page=1&hitsPerPage=16";
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
      const aHandle = await page.evaluateHandle(() =>
        document.querySelector("div#root")
      );
      const resultHandle = await page.evaluateHandle(
        (body) => body.innerHTML,
        aHandle
      );
      let data = await resultHandle.jsonValue();
      await fsPromises.writeFile("lider.html", data);
      await resultHandle.dispose();

      try {
        /* products.forEach(async (prod) => {
          const nombreTabla = "scanunimarc";
          await insertProduct(nombreTabla, prod);
        }); */
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
scanLider();
