const cName = document.querySelector("[name=nombre]");
const lastName = document.querySelector("[name=apellido]") ;
const email = document.querySelector("[name=correo]");
const phone = document.querySelector("[name=teléfono]");

const campoNoVacio = (message,e) => {
    const campo = e.target;
    const campoValor = e.target.value;
    
    if (campoValor.trim().length ===0){
        campo.classList.add("invalid");
        campo.nextElementSibling.classList.add("error");
        campo.nextElementSibling.innerText =message

    }else {
        campo.classList.remove("invalid");
        campo.nextElementSibling.classList.remove("error");
        campo.nextElementSibling.innerText = "";

    }

}

cName.addEventListener("blur", (e) =>campoNoVacio("Agregue su Nombre Completo por favor",e));
lastName.addEventListener("blur", (e) =>campoNoVacio("No se olvide de su Apellido",e));
email.addEventListener("blur", (e) =>campoNoVacio("Ingreso un correo",e));
phone.addEventListener("blur", (e) =>campoNoVacio("Necesitamos que indique su teléfono",e));

const formatoCorreo = e => {
    const campo = e.target;
    const campoValor = e.target.value;
    const regex= new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    if (campoValor.trim().length > 5 && !regex.test(campoValor)){
        campo.classList.add("invalid");
        campo.nextElementSibling.classList.add("error");
        campo.nextElementSibling.innerText = "Por favor ingrese un correo válido"

    }else {
        campo.classList.remove("invalid");
        campo.nextElementSibling.classList.remove("error");
        campo.nextElementSibling.innerText = "";

    }

}

email.addEventListener("input", formatoCorreo); 