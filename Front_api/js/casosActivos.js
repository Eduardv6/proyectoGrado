(function () {


    const userInSession = getUserInSession();
    if (userInSession){
        document.querySelector("#exit-session").addEventListener("click",salir);
        cargarCasos();
        return;
    }
    document.body.style.display = "block";
    window.location.href = 'index.html';
    
})();

//create function cargarDelitos
function cargarCasos() {

    fetch("http://localhost:8000/api/casos/listDelitosAct")
        .then((response) => {
            return response.json();
        })
        .then(function (data) {
            console.log("imprimiendo Casos")
            console.log(data)
            mostrarCasos(data);
        })
        .catch((error) => {
            console.log(error);
            alert("Ocurrio un error al obtener los Casos");
        });


}



function mostrarCasos(casos) {
    const casosHTML = document.querySelector("#tableBody");
    casosHTML.innerHTML = "";

    if (casos.length == 0) {
        casosHTML.innerHTML = '<div class="msg-vacio">No tiene casos registrados</div>'
        return;
    }


    let html = ""
    for (const i in casos) {
        const obj = casos[i];

        let casosHTML = getCasosInHTML(obj);

        html += casosHTML;
    }
    casosHTML.innerHTML = html;
}

function getCasosInHTML(obj) {

    return `    
                
                            
                            <tr>
                            <td><img class="img-fluid"
                                src="../../api/public/File/${obj.filename}"/></td>
                                <td>${obj.id}</td>
                                <td>${obj.tipoCaso}</td>
                                <td>${obj.fecha}</td>
                                <td>${obj.hora}</td>
                                <td>${obj.nombreVictima}</td>
                                <td>${obj.name}</td>
                                <td>${obj.estado}</td>
                                <td><a href="verCasosActivos.html?id=${obj.id}" class="btn">Ver</a></td>
                                <td><a href="evidencias.html?id=${obj.id}" class="btn">agregar Evidencias</a></td>
                                <td><button onclick="marcarComoFinalizado(${obj.id})" class="btn">Finalizado</button></td>
                  
            `
}


function editarContacto(evt, casosId) {
    evt.preventDefault();
    debugger;


}
function marcarComoFinalizado(casoId) {
    // Realiza una solicitud al servidor para cambiar el estado del caso
    fetch(`http://localhost:8000/api/casos/marcarFinalizado/${casoId}`, {
        method: 'PUT', // Usar el método PUT para actualizar el estado
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.isOK) {
            // Si la operación se realiza con éxito, recargar la lista de casos activos
            cargarCasos();
        } else {
            alert('No se pudo marcar el caso como finalizado.');
        }
    })
    .catch((error) => {
        console.error(error);
        alert('Ocurrió un error al marcar el caso como finalizado.');
    });
}