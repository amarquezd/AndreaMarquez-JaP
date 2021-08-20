//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function () {

    fetch(PRODUCTS_URL)
    
    .then(response => response.json())

    .then(data => {
        
        data.forEach(data => {

            let info=""

            info=
            `
            <tr>
            <td>` + data.marca + `</td>
            <td>` + data.modelo + `</td>
            <td>` + data.color + `</td>
            </tr>
            `;

            document.getElementsByClassName("products").innerHTML += info;
            
        });
    })

    .catch (error => alert("Hubo un error!:" + error));

});