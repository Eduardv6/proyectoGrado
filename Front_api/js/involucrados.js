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

    const nombreAutor = document.querySelector("#nombre_autor").value
    const caso_id = document.querySelector("#caso_id").value
    const sexo = document.querySelector("#edad_autor").value
    const edad = document.querySelector("#sexo_autor").value
    const nacionalidad = document.querySelector("#nacionalidad_a").value
    const temperancia = document.querySelector("#temperancia_a").value

    const validacionnombreAutor = document.querySelector("#validation-nombreautor");
    const validacioncaso_id = document.querySelector("#validation-caso_id");
    const validacionsexo = document.querySelector("#validation-sexoautor");
    const validacionedad = document.querySelector("#validation-edadautor");
    const validacionnacionalidad = document.querySelector("#validation-nacionalidada");
    const validaciontemperancia = document.querySelector("#validation-temperanciaa");

    const msgError = document.querySelector("#msg-error-regis")

    validacionnombreAutor.style.display = "none";
    validacioncaso_id.style.display = "none";
    validacionsexo.style.display = "none";
    validacionedad.style.display = "none";
    validacionnacionalidad.style.display = "none";
    validaciontemperancia.style.display = "none";
    
    debugger;
    let hasError = false;

    if (nombreAutor == "") {
        hasError = true;
        validacionnombreAutor.style.display = "block"
    }

    if (caso_id == "") {
        hasError = true;
        validacioncaso_id.style.display = "block"
    }

    if (sexo == "") {
        hasError = true;
        validacionsexo.style.display = "block"
    }

    if (edad == "") {
        hasError = true;
        validacionedad.style.display = "block"
    }

    if (nacionalidad == "") {
        hasError = true;
        validacionnacionalidad.style.display = "block"
    }

    if (temperancia == "") {
        hasError = true;
        validaciontemperancia.style.display = "block"
    }

    if (hasError) {
        return;
    }
    debugger;

    const involucrados = {
        nombreAutor: nombreAutor,
        caso_id: caso_id,
        sexo: sexo,
        edad: edad,
        nacionalidad: nacionalidad,
        temperancia: temperancia,
    }
    debugger;

    fetch('http://localhost:8000/api/involucrados/store', {
        method: 'POST',
        headers: {
            'Accept': 'application/json', //MimeType
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(involucrados)
        
    }).then((response) => {
        document.location.href = "georeferencia.html";
        return response.json();
    }).then((data) => {
        if (!data.isOK) {
            msgError.innerHTML = data.message;
            msgError.style.display = "block"
            return;
        }
        debugger;
        document.location.href = "involucrados.html";

    });
});