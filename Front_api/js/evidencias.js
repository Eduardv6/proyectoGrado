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

    const fileName = document.querySelector("#evidenciasbtn").value

    const msgError = document.querySelector("#msg-error-regis")

    
    
    debugger;
    
 

    const caso = {
    
        fileName: fileName
    }
    debugger;
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    fetch(`http://localhost:8000/api/casos/update/${id}`, {
        method: 'PUT',
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
});


