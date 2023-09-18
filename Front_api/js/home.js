(function(){

    const userInSession = getUserInSession();
    if (userInSession){

        debugger;
        const btnList = document.querySelector("#create-user")
        
        debugger;
        if (userInSession.rol == "Administrador"){
            debugger
            btnList.style.display = "block"
            debugger;
        }
        if (userInSession.rol == "Investigador"){
            debugger
            btnList.style.display = "none"
            debugger;
        }
        

        document.querySelector("#exit-session").addEventListener("click",salir);
        return;
    }
    
    document.body.style.display = "block";
    window.location.href = 'index.html';
    return;
})();
document.querySelector("#create-user").addEventListener('click', (e) => {
    e.preventDefault();

    document.location.href = "ListaUsuarios.html";

});











