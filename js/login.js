//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

function guardaYVe(){
  
    const nombre = document.getElementById('nombre').value;
    const clave = document.getElementById('clave').value;
      
    if(nombre === '' || clave === '' ) {
      alert('Debes ingresar los datos solicitados');
    }else{
      window.location.href = 'file:///C:/Users/Andrea%20Marquez/Documents/GitHub/AndreaMarquez-JaP/init-page.html';
    }
    localStorage.setItem('nombre', nombre);
  }