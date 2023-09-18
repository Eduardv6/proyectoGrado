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

    fetch("http://localhost:8000/api/casos/listDelitosFin")
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
                                <td></td>
                                <td></td>
                                <td>${obj.id}</td>
                                <td>${obj.tipoCaso}</td>
                                <td>${obj.fecha}</td>
                                <td>${obj.hora}</td>
                                <td>${obj.nombreVictima}</td>
                                <td>${obj.name}</td>
                                <td>${obj.estado}</td>
                                <td><a href="verCasosActivos.html?id=${obj.id}" class="btn">Ver</a></td>
                                <td><a href="evidencias.html?id=${obj.id}" class="btn">agregar Evidencias</a></td>
                               
                  
            `
}


function editarContacto(evt, casosId) {
    evt.preventDefault();
    debugger;


}
