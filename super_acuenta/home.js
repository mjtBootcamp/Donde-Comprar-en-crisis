const homeAcuenta = (document) => {
  console.log("document :>> ", document);
  let div = document.querySelectorAll(".fRAese");
  console.log("div", div); // console.log inside evaluate, will show on browser console not on node console

  let productnames = [];
  div.forEach((element) => {
    let titleelem = element.querySelector(".prod__name");
    if (titleelem != null) {
      productnames.push(titleelem.textContent);
    }
  });

  return productnames;
}
export default { homeAcuenta };
