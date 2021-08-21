//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";

    fetch(PRODUCTS_URL)
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
        })
});
