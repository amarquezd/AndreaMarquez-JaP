//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const FIAT = "https://amarquezd.github.io/JaP-para-Jsons/FIAT-INFO.json"
const PEUGEOT208 = "https://amarquezd.github.io/JaP-para-Jsons/PEUGEOT208-INFO.json"
const SUZUKI = "https://amarquezd.github.io/JaP-para-Jsons/SUZUKI-INFO.json"
const CHEVROLET = "https://amarquezd.github.io/JaP-para-Jsons/CHEVROLET-INFO.json"
const ALL_PRODS = "https://amarquezd.github.io/JaP-para-Jsons/all-prods.json"
var comments = [];
var relatedProdsArray = []

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

function verProducto(id) {
    localStorage.setItem("producto", JSON.stringify({ productoId: id }));
    window.location = "product-info.html";
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

                    productName.innerHTML += product.name;
                    productCost.innerHTML += product.currency + ` ` + product.cost;
                    productDescription.innerHTML = product.description;

                    mostrarImagenes(product.images);

                }

            });

        }

        fetch(ALL_PRODS)
            .then(response => response.json())
            .then(data => {
                let prodObjString = localStorage.getItem("producto");
                let prodObject = JSON.parse(prodObjString);
                let info = [];

                info = data.find(car => prodObject.productoId == car.id).relatedProducts;
                // info = data[prodObject.productoId].relatedProducts;
                // for(let i =0 ; i< data.length; i++) {
                // const car = data[i]
                //     if(prodObject === data[i].id){
                //         info = data[i].relatedProducts;
                //     }
                // }

                fetch(PRODUCTS_URL)
                    .then(respuesta => respuesta.json())
                    .then(datos => {

                        let relacionados = "";

                        for(let i = 0; i< info.length; i++) {

                            let relacion = datos[info[i]];

                            relacionados += `
                        <div class="card" style="width: 10rem; display: inline-block;">
                        <img src="${relacion.imgSrc}" class="card-img-top" alt="">
                        <div class="card-body">
                          <h5 class="card-title">${relacion.name}</h5>
                          <p class="card-text">USD ${relacion.cost}</p>
                          <a href="javascript:verProducto(${relacion.id})" class="btn btn-secondary">VER</a>
                        </div>
                      </div>`
                                           
                        };
                        
                        document.getElementById("related").innerHTML = relacionados;
                    })

            })

        /*fetch(PRODUCTS_URL)
            .then(respuesta => respuesta.json())
            .then(datos => {

                let relacionados = "";

                for (let dato of datos) {

                    relacionados += `
                        <div class="card" style="width: 10rem; display: inline-block;">
                        <img src="${dato.imgSrc}" class="card-img-top" alt="">
                        <div class="card-body">
                          <h5 class="card-title">${dato.name}</h5>
                          <p class="card-text">${dato.cost}</p>
                          <a href="javascript:verProducto(${dato.id})" class="btn btn-secondary">VER</a>
                        </div>
                      </div>`

                }
                document.getElementById("related").innerHTML = relacionados;

            })*/


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
})