//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let correo = localStorage.getItem("profileMail");
let nombrePerfil = localStorage.getItem("profileName");
let fechaNacimiento = localStorage.getItem("profileDate");
let telefono = localStorage.getItem("profPhone");

function guardaInfo() {

    let profileName = document.getElementById("profile-name-info").value;
    let profileDate = document.getElementById("profile-date-info").value;
    let profilePhone = document.getElementById("profile-phone-info").value;
    let profileMail = document.getElementById("profile-mail-info").value;

    localStorage.setItem("profileName", profileName);
    localStorage.setItem("profileDate", profileDate);
    localStorage.setItem("profPhone", profilePhone);
    localStorage.setItem("profileMail", profileMail);


    mostrarInfo();
}

function mostrarInfo() {

    nombrePerfil = localStorage.getItem("profileName");
    fechaNacimiento = localStorage.getItem("profileDate");
    telefono = localStorage.getItem("profPhone");
    correo = localStorage.getItem("profileMail");

    document.getElementById("profile-name").innerHTML = `<strong> ${nombrePerfil} </strong>`;
    document.getElementById("profile-date").innerHTML = `<strong> ${fechaNacimiento} </strong>`;
    document.getElementById("profile-phone").innerHTML = `<strong> ${telefono} </strong>`;
    document.getElementById("profile-mail").innerHTML = `<strong> ${correo} </strong>`;

}

document.addEventListener("DOMContentLoaded", function (e) {

    if (localStorage.getItem("profileName") == null) {
        document.getElementById("profile-name").innerHTML = "";
    } else {
        document.getElementById("profile-name").innerHTML = `<strong> ${nombrePerfil} </strong>`;
    };

    if (localStorage.getItem("profileDate") === null) {
        document.getElementById("profile-date").innerHTML = "";
    } else {
        document.getElementById("profile-date").innerHTML = `<strong> ${fechaNacimiento} </strong>`;
    }

    if (localStorage.getItem("profileMail") === null) {
        document.getElementById("profile-mail").innerHTML = "";
    } else {
        document.getElementById("profile-mail").innerHTML = `<strong> ${correo} </strong>`;
    }
    
    if (localStorage.getItem("profPhone") == null) {
        document.getElementById("profile-phone").innerHTML = "";
    } else {
        document.getElementById("profile-phone").innerHTML = `<strong> ${telefono} </strong>`;
    }
});