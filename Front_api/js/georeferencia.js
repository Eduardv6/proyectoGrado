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

    const departamento = document.querySelector("#departamento").value
    const provincia = document.querySelector("#provincia").value
    const municipio = document.querySelector("#municipio").value
    const comunidad = document.querySelector("#comunidad").value
    const caso_id = document.querySelector("#caso_id").value
    const zona = document.querySelector("#zona").value

    const validaciondepartamento = document.querySelector("#validation-departamento");
    const validacionprovincia = document.querySelector("#validation-provincia");
    const validacionmunicipio = document.querySelector("#validation-municipio");
    const validacioncomunidad = document.querySelector("#validation-comunidad");
    const validacioncaso_id = document.querySelector("#validation-caso_id");
    const validacionzona = document.querySelector("#validation-zona");

    const msgError = document.querySelector("#msg-error-regis")

    validaciondepartamento.style.display = "none";
    validacionprovincia.style.display = "none";
    validacionmunicipio.style.display = "none";
    validacioncomunidad.style.display = "none";
    validacioncaso_id.style.display = "none";
    validacionzona.style.display = "none";
    
    debugger;
    let hasError = false;

    if (departamento == "") {
        hasError = true;
        validaciondepartamento.style.display = "block"
    }

    if (provincia == "") {
        hasError = true;
        validacionprovincia.style.display = "block"
    }

    if (municipio == "") {
        hasError = true;
        validacionmunicipio.style.display = "block"
    }

    if (comunidad == "") {
        hasError = true;
        validacioncomunidad.style.display = "block"
    }

    if (caso_id == "") {
        hasError = true;
        validacioncaso_id.style.display = "block"
    }

    if (zona == "") {
        hasError = true;
        validacionzona.style.display = "block"
    }

    if (hasError) {
        return;
    }
    debugger;

    const georeferencia = {
        departamento: departamento,
        provincia: provincia,
        municipio: municipio,
        comunidad: comunidad,
        caso_id: caso_id,
        zona: zona,
    }
    debugger;

    fetch('http://localhost:8000/api/georeferencia/store', {
        method: 'POST',
        headers: {
            'Accept': 'application/json', //MimeType
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(georeferencia)
        
    }).then((response) => {
        window.alert("Georeferencia registrada con exito");
        document.location.href = "home.html";
        return response.json();
    }).then((data) => {
        if (!data.isOK) {
            msgError.innerHTML = data.message;
            msgError.style.display = "block"
            return;
        }
        debugger;
        window.alert("No se pudo Registrar la Georeferencia");
        document.location.href = "georeferencia.html";

    });
});