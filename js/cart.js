//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const CART_PRODS = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
let productos

function subtotal(numberOfArticles) {
  let totalPesos = 0;
  let totalDolares = 0

  for (let i = 0; i < numberOfArticles; i++) {

    let cantidad = parseInt(document.getElementById(`quantity${i}`).value);
    let precio = parseInt(document.getElementById(`precioitem${i}`).innerHTML);

    let subtotalItem = cantidad * precio;

    if (productos[i].currency != "UYU") {
      totalPesos += subtotalItem * 40;
      totalDolares += subtotalItem;
    } else {
      totalPesos += subtotalItem;
      totalDolares += subtotalItem / 40;
    }

    document.getElementById(`subtitem${i}`).innerHTML = subtotalItem;
  }

  document.getElementById(`precioUyu`).innerHTML = `UYU `+ totalPesos;
  document.getElementById(`precioUsd`).innerHTML = `USD `+ totalDolares;
}

document.addEventListener("DOMContentLoaded", function (e) {

  fetch(CART_PRODS)
    .then(response => response.json())
    .then(data => {

      productos = data.articles;

      for (let i = 0; i < data.articles.length; i++) {

        let item = data.articles[i];

        const row = `<div class="row mt-4 ml-1">
       <div class="col-sm-2 col-md-3 col-lg-3 ">
         <img src="${item.src}" alt="" class="img-thumbnail">
       </div>
       <div class="col-sm-7 col-md-4 col-lg-5">
         <small class="text-muted">Item</small>
         <h6>${item.name}</h6>
         <small class="text-muted">Cant.</small><br>
         <div>
           <input type="number" id="quantity${i}" name="cantidad" min="1" max="5" class=" btn-outline-secondary" value="${item.count}">
         </div>
       </div>
       <div class="col-sm-6 col-md-2 col-lg-2">
         <h6 class="text-muted">Precio: </h6>
         <h4>${item.currency}</h4><h4 id="precioitem${i}">${item.unitCost}</h4>
       </div>
       <div class="col-sm-6 col-md-2 col-lg-2">
         <h6 class="text-muted">Subtotal: </h6>
         <h3>${item.currency}</h3><h3 id="subtitem${i}"></h3>
       </div>
     </div>
     <hr>`

        document.getElementById("cart_info").innerHTML += row;

      }

      for (let i = 0; i < data.articles.length; i++) {
        document.getElementById(`quantity${i}`).addEventListener("change", () => subtotal(data.articles.length));
        subtotal(data.articles.length);
      }

      document.getElementById('numberOfItems').innerHTML = data.articles.length +` items`;
    })



});