//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const FIAT = "https://amarquezd.github.io/JaP-para-Jsons/FIAT-INFO.json"
const PEUGEOT208 = "https://amarquezd.github.io/JaP-para-Jsons/PEUGEOT208-INFO.json"
const SUZUKI = "https://amarquezd.github.io/JaP-para-Jsons/SUZUKI-INFO.json"
const CHEVROLET = "https://amarquezd.github.io/JaP-para-Jsons/CHEVROLET-INFO.json"
const ALL_PRODS = "https://amarquezd.github.io/JaP-para-Jsons/all-prods.json"
var comments = [];

/*function mostrarProducto(product) {
    var name = "";

    name += `<h1> ${product.name} </h1>
    <hr class="my-3">`
    
    document.getElementById("contenido").innerHTML = name;

    let precio ='';
    precio +=`<h2 class="text-muted">${product.currency} ${product.cost}</h2>`

    document.getElementById("costo").innerHTML = precio;

    let description = '';

    description += `<p> ${product.description} </p> `;
    document.getElementById("descripcion").innerHTML = description;
}*/



function mostrarImagenes(array) {

    let content = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        if (i === 0) {
            content +=
                `<div class="carousel-item img-thumbnail justify-content-between active">
        <img src="` + imageSrc + `" class="d-block w-100" alt="">
      </div>`}
        else {
            content += `
      <div class="carousel-item img-thumbnail justify-content-between">
        <img src="` + imageSrc + `" class="d-block w-100" alt="">
      </div>`}

    }

    document.getElementById("imagenes").innerHTML = content;
}

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(ALL_PRODS).then(function (result) {

        if (result.status === "ok") {
            result.data.forEach(product => {
                if (product.id == JSON.parse(localStorage.getItem("producto")).productoId) {

                    /*mostrarProducto(product);*/

                    let productName = document.getElementById("contenido");
                    let productCost = document.getElementById("costo");
                    let productDescription = document.getElementById("descripcion");
                    let productRelated = document.getElementById("related");

                    productName.innerHTML += product.name;
                    productCost.innerHTML += product.currency + ` ` + product.cost;
                    productDescription.innerHTML = product.description;
                    productRelated.innerHTML += product.relatedProducts;

                    mostrarImagenes(product.images);

                }

            });
        }
    })


    fetch(PRODUCT_INFO_COMMENTS_URL)

        .then(respuesta => respuesta.json())

        .then(datos => {

            let htmlContentToAppend = "";

            for (let dato of datos) {

                htmlContentToAppend += `
                         <div class="list-group-item justify-content-between">            
                            <div class="row">
                                <div class="col-3">
                                <h4 class="mb-1"> ${dato.user} </h4>
                                <p class="text-muted"> ${dato.dateTime} </p>
                                </div>
                                <div class="col">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h5 class="text-muted">${dato.score} /5 </h5>                        
                                    </div>
                                    <p class="mb-1">${dato.description}</p>                        
                                </div>                   
                            </div>   
                         </div>                             
                        `}

            document.getElementById("commentSect").innerHTML = htmlContentToAppend;
        })

});