const pruebaProcesandoPreciosUnimarc=()=>{
    let precios = [];
        let preciosElementos = document.querySelectorAll("div .Shelf_shelf__WM77V > div > div > div > div > div");
        preciosElementos.forEach((p) => {
            let pbp = "";
            let textPrecioBase = 0;
            if (p.children[0].children[0].textContent != undefined) {
              console.log("aqui",p.children[0].children[0].textContent);
            pbp = p.children[0].children[0].textContent;
            let a = pbp.match(/\d/g);
            let b = a.join("");
            textPrecioBase = parseInt(b);
            precios.push(textPrecioBase);
          } else {
            precios.push(null);
          }
        });
        console.log('precios :>> ', precios);
}