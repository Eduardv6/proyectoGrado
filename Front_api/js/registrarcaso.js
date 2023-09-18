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

    const TipoCaso = document.querySelector("#tipo_caso").value
    const NombreVic = document.querySelector("#nombre_victima").value
    const edadVic = document.querySelector("#edad_victima").value
    const sexoVic = document.querySelector("#sexo_victima").value
    const Nacionalidad = document.querySelector("#nacionalidad").value
    const tempVic = document.querySelector("#temperancia_victima").value
    const userCasoId = document.querySelector("#usercaso_id").value
    const filename = document.querySelector("#image-file").files[0];
    

    const validacionTipoCaso = document.querySelector("#validation-tipoCaso");
    const validacionNombreVic = document.querySelector("#validation-nombreVictima");
    const validacionEdadVic = document.querySelector("#validation-edadVictima");
    const validacionSexoVic = document.querySelector("#validation-sexoVictima");
    const validacionNacionalidad = document.querySelector("#validation-nacionalidad");
    const validacionTempVic = document.querySelector("#validation-temperanciaVictima");
    const validacionUserCasoId = document.querySelector("#validation-investigadorAsignado");

    const msgError = document.querySelector("#msg-error-regis")

    validacionTipoCaso.style.display = "none";
    validacionNombreVic.style.display = "none";
    validacionEdadVic.style.display = "none";
    validacionSexoVic.style.display = "none";
    validacionNacionalidad.style.display = "none";
    validacionTempVic.style.display = "none";
    validacionUserCasoId.style.display = "none";
    
    debugger;
    let hasError = false;

    if (TipoCaso == "") {
        hasError = true;
        validacionTipoCaso.style.display = "block"
    }

    if (NombreVic == "") {
        hasError = true;
        validacionNombreVic.style.display = "block"
    }

    if (edadVic == "") {
        hasError = true;
        validacionEdadVic.style.display = "block"
    }

    if (sexoVic == "") {
        hasError = true;
        validacionSexoVic.style.display = "block"
    }

    if (Nacionalidad == "") {
        hasError = true;
        validacionNacionalidad.style.display = "block"
    }

    if (tempVic == "") {
        hasError = true;
        validacionTempVic.style.display = "block"
    }

    if (userCasoId == "") {
        hasError = true;
        validacionUserCasoId.style.display = "block"
    }
   

    if (hasError) {
        return;
    }
    debugger;

    const caso = {
        tipoCaso: TipoCaso,
        nombreVictima: NombreVic,
        sexo: sexoVic,
        edad: edadVic,
        nacionalidad: Nacionalidad,
        temperancia: tempVic,
        userCaso_id: userCasoId,
        filename: filename
    }
    debugger;

    fetch('http://localhost:8000/api/casos/store', {
        method: 'POST',
        headers: {
            'Accept': 'application/json', //MimeType
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(caso)
        
    }).then((response) => {
        //document.location.href = "delitos.html";
        return response.json();
    }).then((data) => {
        if (!data.isOK) {
            msgError.innerHTML = data.message;
            msgError.style.display = "block"
            return;
        }
        debugger;
        document.location.href = "index.html";

    });
    document.querySelector("#image-file").addEventListener("change", uploadFile);
});

function uploadFile(){
    let photo = document.getElementById("image-file").files[0];
    let formData = new FormData();   
    formData.append("image", photo);
    fetch('http://localhost:8000/api/casos/upload', {
        method: "POST", 
        body: formData
    }).then((response) =>{
        return response.json();
    }).then((data) => {
        
       if(!data.isOK){
            alert("No se pudo subir el archivo");
            return;
       }

       //data.message contiene el FileId que se subió
       const fileId = data.message;
       alert(data.message);
       document.querySelector("#imageFileId").value = fileId;
       const image = document.querySelector("#image");
       image.src = "img/personas" + fileId;

    });
}

