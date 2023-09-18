(function () {
    const userInSession = getUserInSession();
    if (userInSession){
        document.querySelector("#exit-session").addEventListener("click",salir);
        return;
    }
    document.body.style.display = "block";
    window.location.href = 'index.html';


})();

document.querySelector("#btn-regis").addEventListener('click', (e) => {
    e.preventDefault();

    const delito = document.querySelector("#delito").value
    const caso_id = document.querySelector("#caso_id").value
    const fecha = document.querySelector("#fecha").value
    const hora = document.querySelector("#hora").value
    const objetosRobado = document.querySelector("#objetos_robados").value
    const instrumentos = document.querySelector("#instrumentos_utlizados").value
    const medios = document.querySelector("#medios_utlizados").value

    const validaciondelito = document.querySelector("#validation-delito");
    const validacioncaso_id = document.querySelector("#validation-casoid");
    const validacionfecha = document.querySelector("#validation-fecha");
    const validacionhora = document.querySelector("#validation-hora");
    const validacionobjetosRobado = document.querySelector("#validation-objetosrobados");
    const validacioninstrumentos = document.querySelector("#validation-instrumentosutlizados");
    const validacionmedios = document.querySelector("#validation-mediosutlizados");

    const msgError = document.querySelector("#msg-error-regis")

    validaciondelito.style.display = "none";
    validacioncaso_id.style.display = "none";
    validacionfecha.style.display = "none";
    validacionhora.style.display = "none";
    validacionobjetosRobado.style.display = "none";
    validacioninstrumentos.style.display = "none";
    validacionmedios.style.display = "none";
    
    debugger;
    let hasError = false;

    if (delito == "") {
        hasError = true;
        validaciondelito.style.display = "block"
    }

    if (caso_id == "") {
        hasError = true;
        validacioncaso_id.style.display = "block"
    }

    if (fecha == "") {
        hasError = true;
        validacionfecha.style.display = "block"
    }

    if (hora == "") {
        hasError = true;
        validacionhora.style.display = "block"
    }

    if (objetosRobado == "") {
        hasError = true;
        validacionobjetosRobado.style.display = "block"
    }

    if (instrumentos == "") {
        hasError = true;
        validacioninstrumentos.style.display = "block"
    }

    if (medios == "") {
        hasError = true;
        validacionmedios.style.display = "block"
    }

    if (hasError) {
        return;
    }
    debugger;

    const delitos = {
        delito: delito,
        caso_id: caso_id,
        fecha: fecha,
        hora: hora,
        objetosRobado: objetosRobado,
        instrumentos: instrumentos,
        medios: medios
    }
    debugger;

    fetch('http://localhost:8000/api/delitos/store', {
        method: 'POST',
        headers: {
            'Accept': 'application/json', //MimeType
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(delitos)
        
    }).then((response) => {
        document.location.href = "involucrados.html";
        return response.json();
        
    }).then((data) => {
        if (!data.isOK) {
            msgError.innerHTML = data.message;
            msgError.style.display = "block"
            return;
        }
        debugger;
        document.location.href = "delitos.html";

    });
});