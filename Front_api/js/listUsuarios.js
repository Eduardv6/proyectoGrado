(function () {
    const userInSession = getUserInSession();
    if (userInSession){
        document.querySelector("#exit-session").addEventListener("click",salir);
        cargarUsers();
        return;
    }
    document.body.style.display = "block";
    window.location.href = 'index.html';
})();
function cargarUsers() {
    fetch("http://localhost:8000/api/userList")
        .then((response) => {
            return response.json();
        })
        .then(function (data) {
            console.log("imprimiendo Usuarios")
            console.log(data)
            mostrarUsuarios(data);
        })
        .catch((error) => {
            console.log(error);
            alert("Ocurrio un error al obtener los Usuarios");
        });
}



function mostrarUsuarios(user) {
    const usersHTML = document.querySelector("#tableBody");
    usersHTML.innerHTML = "";
    if (user.length == 0) {
        usersHTML.innerHTML = '<div class="msg-vacio">No tiene usuarios registrados</div>'
        return;
    }
    let html = ""
    for (const i in user) {
        const obj2 = user[i];
        let usersHTML = getUsuariosInHTML(obj2);
        html += usersHTML;
    }
    usersHTML.innerHTML = html;
}
function getUsuariosInHTML(obj2) {

    return ` 
                            <tr>
                                <td></td>
                                <td>${obj2.id}</td>
                                <td>${obj2.name}</td>
                                <td>${obj2.email}</td>
                                <td>${obj2.grado}</td>
                                <td>${obj2.rol}</td>
                                <td><a href="editarUser.html?id=${obj2.id}" class="btn">Editar</a></td>
                                
            `
}