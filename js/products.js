//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const ORDER_ASC_BY_PRICE = "Menor a Mayor";
const ORDER_DESC_BY_PRICE = "Mayor a Menor";
const ORDER_BY_PROD_RELEV = "Relevancia";
var currentProdArray = [];
var precioMin = undefined;
var precioMax = undefined;

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_RELEV) {
        result = array.sort(function (a, b) {
            let aRev = parseInt(a.soldCount);
            let bRev = parseInt(b.soldCount);

            if (aRev > bRev) { return -1; }
            if (aRev < bRev) { return 1; }
            return 0;
        });
    }
    return result
}

function verProducto(id){
    localStorage.setItem("producto", JSON.stringify({productoId: id}));
    window.location = "product-info.html";    
}

function showProductsList() {

    let htmlContentToAppend = "";

    for (let i = 0; i < currentProdArray.length; i++) {
        let datos = currentProdArray[i];


        if (((precioMin == undefined) || (precioMin != undefined && parseInt(datos.cost) >= precioMin)) &&
            ((precioMax == undefined) || (precioMax != undefined && parseInt(datos.cost) <= precioMax))) {

            htmlContentToAppend += `
            <a href="javascript:verProducto(`+ datos.id +`)"  class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + datos.imgSrc + `" alt="` + datos.name + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ datos.name + `</h4>
                            <h3 class="text-muted">`+ datos.currency + ` ` + datos.cost + `</h3>                        
                        </div>
                        <p class="mb-1">` + datos.description + `</p>                        
                    </div>                   
                </div>               
            </a>
            
            `
        }
        
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }

}

function sortAndShowProd(sortCriteria, prodArray) {
    let currentProdCriteria = sortCriteria;

    if (prodArray != undefined) {
        currentProdArray = prodArray
    }

    currentProdArray = sortProducts(currentProdCriteria, currentProdArray);

    showProductsList()

}

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            sortAndShowProd(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProd(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProd(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByRelev").addEventListener("click", function () {
        sortAndShowProd(ORDER_BY_PROD_RELEV);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        precioMin = document.getElementById("precioMinimo").value;
        precioMax = document.getElementById("precioMaximo").value;

        if ((precioMin != undefined) && (precioMin != "") && (parseInt(precioMin)) >= 0) {
            precioMin = parseInt(precioMin);
        }
        else {
            precioMin = undefined;
        }

        if ((precioMax != undefined) && (precioMax != "") && (parseInt(precioMax)) >= 0) {
            precioMax = parseInt(precioMax);
        }
        else {
            precioMax = undefined;
        }

        showProductsList();
    })
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        precioMin = document.getElementById("precioMinimo").value;
        precioMax = document.getElementById("precioMaximo").value;

        precioMin = undefined;
        precioMax = undefined;

        showProductsList();
    })

    const buscador = document.getElementById("filterDown");

    function filtrar() {

        fetch(PRODUCTS_URL)

            .then(respuesta => respuesta.json())

            .then(datos => {

                const texto = buscador.value.toLowerCase();

                let resultado = ""

                for (let dato of datos) {

                    const busqueda = dato.name.toLowerCase();

                    if (busqueda.includes(texto) || busqueda === '') {
                        
                        resultado += `
                <a href="product-info.html" class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + dato.imgSrc + `" alt="` + dato.name + `" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ dato.name + `</h4>
                                <h3 class="text-muted">$` + dato.cost + `</h3>
                            </div>
                            <p class="mb-1">` + dato.description + `</p>
                        </div>
                    </div>
                </a>
                `
                    }
                }

                document.getElementById("prod-list-container").innerHTML = resultado;

            })

    }

    function filtro() {

        buscador.addEventListener("keyup", filtrar);
    }

    filtro();
});


/*fetch(PRODUCTS_URL)
        .then(response => response.json())
        .then(datos => {

            for (let x = 0; x < datos.length; x++) {


                let imgAutos = '<img height="100" width="150" src= "img/prod' + (x + 1 ) + '.jpg" />';

                let products = document.createElement("tr");
                let nombres = document.createElement("td");
                let cost = document.createElement("td");
                let description = document.createElement("td");
                let imagen = document.createElement("td");

                nombres.innerHTML = datos[x].name;
                cost.innerHTML = datos[x].cost;
                description.innerHTML = datos[x].description;
                imagen.innerHTML = imgAutos;

                products.appendChild(nombres);
                products.appendChild(cost);
                products.appendChild(description);
                products.appendChild(imagen);

                document.getElementById("infor").appendChild(products);

            }
        })*/


