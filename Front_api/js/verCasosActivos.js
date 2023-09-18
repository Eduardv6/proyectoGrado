(function () {


    const userInSession = getUserInSession();
    if (userInSession){
        document.querySelector("#exit-session").addEventListener("click",salir);
        cargarCasos();
        return;
    }
    document.body.style.display = "block";
    window.location.href = 'index.html';
    
    cargarCaso();
})();

function cargarCasos() {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    debugger;
    fetch(`http://localhost:8000/api/casos/listAll/${id}`)
        .then(response => {
            debugger;
            return response.json();
            
        })
        .then(data => {
            
            debugger;
            console.log(data[0])
            
            const idCasoCs = document.querySelector("#idCasoC");
            const tipoCasoCs = document.querySelector("#tipoCasoC");
            const nombreVictimaCs = document.querySelector("#nombreVictimaC");
            const sexoVictimaCs = document.querySelector("#sexoVictimaC");
            const edadVictimaCs = document.querySelector("#edadVictimaC");
            const nacionalidadVictimaCs = document.querySelector("#nacionalidadVictimaC");
            const temperanciaVictimaCs = document.querySelector("#temperanciaVictimaC");
            const delitoCs = document.querySelector("#delitoC");
            const fechaCs = document.querySelector("#fechaC");
            const horaCs = document.querySelector("#horaC");
            const objetosRobadoCs = document.querySelector("#objetosRobadoC");
            const instrumentosCs = document.querySelector("#instrumentosC");
            const mediosCs = document.querySelector("#mediosC");
            const nombreAutorCs = document.querySelector("#nombreAutorC");
            const sexoAutorCs = document.querySelector("#sexoAutorC");
            const edadAutorCs = document.querySelector("#edadAutorC");
            const nacionalidadAutorCs = document.querySelector("#nacionalidadAutorC");
            const temperanciaAutorCs = document.querySelector("#temperanciaAutorC");
            const departamentoCs = document.querySelector("#departamentoC");
            const provinciaCs = document.querySelector("#provinciaC");
            const municipioCs = document.querySelector("#municipioC");
            const comunidadCs = document.querySelector("#comunidadC");
            const zonaCs = document.querySelector("#zonaC");
            const InvestigadorCs = document.querySelector("#InvestigadorC");
            const gradoCs = document.querySelector("#gradoC");

            debugger;
            idCasoCs.innerHTML = '<strong>Número de Caso: </strong> ' + data[id-1].id;
            tipoCasoCs.innerHTML = '<strong>Tipo de Caso: </strong> ' + data[id-1].tipoCaso;
            nombreVictimaCs.innerHTML = '<strong>Nombre Victima: </strong> ' + data[id-1].nombreVictima;
            sexoVictimaCs.innerHTML = '<strong>Sexo Victima: </strong> ' + data[id-1].sexoVictima;
            edadVictimaCs.innerHTML = '<strong>Edad Victima: </strong> ' + data[id-1].edadVictima;
            nacionalidadVictimaCs.innerHTML = '<strong>Nacionalidad Victima: </strong> ' + data[id-1].nacionalidadVictima;
            temperanciaVictimaCs.innerHTML = '<strong>Temperancia Victima: </strong> ' + data[id-1].temperanciaVictima;
            delitoCs.innerHTML = '<strong>Delito: </strong> ' + data[id-1].delito;
            fechaCs.innerHTML = '<strong>Fecha: </strong> ' + data[id-1].fecha;
            horaCs.innerHTML = '<strong>Hora: </strong> ' + data[id-1].hora;
            objetosRobadoCs.innerHTML = '<strong>Objetos Robado: </strong> ' + data[id-1].objetosRobado;
            instrumentosCs.innerHTML = '<strong>Instrumentos Utilizados: </strong> ' + data[id-1].instrumentos;
            mediosCs.innerHTML = '<strong>Medios utilizados: </strong> ' + data[id-1].medios;
            nombreAutorCs.innerHTML = '<strong>Nombre Autor: </strong> ' + data[id-1].nombreAutor;
            sexoAutorCs.innerHTML = '<strong>Sexo Autor: </strong> ' + data[id-1].sexoAutor;
            edadAutorCs.innerHTML = '<strong>Edad Autor: </strong> ' + data[id-1].edadAutor;
            nacionalidadAutorCs.innerHTML = '<strong>Nacionalidad Autor: </strong> ' + data[id-1].nacionalidadAutor;
            temperanciaAutorCs.innerHTML = '<strong>Temperancia Autor: </strong> ' + data[id-1].temperanciaAutor;
            departamentoCs.innerHTML = '<strong>Departamento: </strong> ' + data[id-1].departamento;
            provinciaCs.innerHTML = '<strong>provincia: </strong> ' + data[id-1].provincia;
            municipioCs.innerHTML = '<strong>Municipio: </strong> ' + data[id-1].municipio;
            comunidadCs.innerHTML = '<strong>Comunidad: </strong> ' + data[id-1].comunidad;
            zonaCs.innerHTML = '<strong>Zona: </strong> ' + data[id-1].zona;
            InvestigadorCs.innerHTML = '<strong>Investigador: </strong> ' + data[id-1].Investigador;
            gradoCs.innerHTML = '<strong>Grado: </strong> ' + data[id-1].grado;
            debugger;
        })
        .catch(error => {
            console.error("Error en la solicitud: ", error);
        });



}
//create function to display fileName from database
function cargarFile() {
    
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    debugger;
    fetch(`http://localhost:8000/api/casos/listAll/${id}`)
        .then(response => {
            debugger;
            return response.json();
                
        })
        .then(data => {
                
            debugger;
            console.log(data[0])
                
            const fileNameCs = document.querySelector("#fileNameC");
                
    
            debugger;
            fileNameCs.innerHTML = '<strong>Nombre de Archivo: </strong> ' +'<a>'+data[id-1].fileName+'</a>' ;
                
            debugger;
        })
        .catch(error => {
            console.error("Error en la solicitud: ", error);
        });
}




// Función para generar un PDF a partir del contenido de un div HTML
function generarPDF(event) {
    const id = urlParams.get('id');
    event.preventDefault(); // Prevenir el comportamiento predeterminado del evento (por ejemplo, enviar un formulario)

    const divContenido = document.querySelector('#genPru'); // Obtener el div de contenido por su ID

    // Verificar si el div está vacío
    if (!divContenido || !divContenido.innerHTML.trim()) {
        alert('No se puede crear el PDF ya que el div de contenido está vacío');
        return; // Salir de la función si el div está vacío
    }

    const str = divContenido.innerHTML; // Obtener el contenido del div como una cadena de texto

    const doc = new jsPDF(); // Crear una instancia de jsPDF para generar el PDF
    doc.fromHTML(str); // Agregar el contenido del div al PDF
    doc.save('numeroDeCaso.pdf'); // Guardar el PDF con el nombre "contenido.pdf"
}




