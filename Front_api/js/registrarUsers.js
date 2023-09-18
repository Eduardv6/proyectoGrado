(function () {
    const userInSession = getUserInSession();
    if (!userInSession) {
        document.location.href = "login.html";
        return;
    }
    document.querySelector("body").style = "display:block";
    const urlParams = new URLSearchParams(window.location.search);
    const usuarioId = urlParams.get('id');

    if (usuarioId && !isNaN(usuarioId)) {
        document.querySelector("#titulo-pg").innerHTML = "Editar Usuario"

        fetch('http://localhost:8000/api/users/update/${usuarioId}', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json', //MimeType
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(urlParams.get('id'))
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                const Name = document.querySelector("#name").value
                const Email = document.querySelector("#email").value
                const Password = document.querySelector("#password").value
                const SecondPassword = document.querySelector("#secondPassword").value
                const Grado = document.querySelector("#inputGrado").value
                const Rol = document.querySelector("#inputRol").value
                const usuarioIdControl = document.querySelector("#usuarioId");

                Name.value = data.name;
                Email.value = data.email;
                Password.value = data.password;
                SecondPassword.value = data.password;
                Grado.value = data.grado;
                Rol.value = data.rol;
                usuarioIdControl.value = data.id;
                
            })

    } else {
        document.querySelector("#titulo-pg").innerHTML = "Nuevo Usuario"
    }

    document.querySelector("#btn-regis").addEventListener('click', () => {

        const usuarioId = document.querySelector("#usuarioId").value
        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const password = document.querySelector("#password").value.trim();
        const secondPassword = document.querySelector("#secondPassword").value.trim();
        const grado = document.querySelector("#inputGrado").value.trim();
        const rol = document.querySelector("#inputRol").value.trim();;


        const valName = document.querySelector("#validation-nombre");
        const valEmail = document.querySelector("#validation-email");
        const valPassword = document.querySelector("#validation-password");
        const valSecondPass = document.querySelector("#validation-secondPassword");
        const valGrado = document.querySelector("#validation-grado");
        const valRol = document.querySelector("#validation-rol");

        const msgError = document.querySelector("#msg-error-regis");

        valName.style.display = "none";
        valEmail.style.display = "none";
        valPassword.style.display = "none";
        valSecondPass.style.display = "none";
        valGrado.style.display = "none";
        valRol.style.display = "none";

        let hasError = false;

    if (name == "") {
        hasError = true;
        valName.style.display = "block"
    }

    if (email == "") {
        hasError = true;
        valEmail.style.display = "block"
    } else if (!isEmailValid(email)) {
        hasError = true;
        valEmail.innerHTML = "El correo electrónico no es válido"
        valEmail.style.display = "block"
    }

    if (password == "") {
        hasError = true;
        valPassword.style.display = "block"
    } else if (!isPasswordValid(password)) {
        hasError = true;
        valPassword.innerHTML = "La contraseña debe tener minimo ocho caracteres, al menos una letra y un número"
        valPassword.style.display = "block"
    }

    if (secondPassword == "") {
        hasError = true;
        valSecondPass.style.display = "block"
    }
    if (password != secondPassword) {
        hasError = true;
        valPassword.innerHTML = "Las contraseñas no coinciden"
        valSecondPass.innerHTML = "Las contraseñas no coinciden"
        valPassword.style.display = "block"
        valSecondPass.style.display = "block"
    }

    if (grado == "") {
        hasError = true;
        valGrado.style.display = "block"
    }
    if (rol == "") {
        hasError = true;
        valRol.style.display = "block"
    }

    if (hasError) {
        return;
    }
    debugger;

        
        const insertusuario = {
            name: name,
            email: email,
            password: password,
            grado: grado,
            rol: rol
        }
        debugger;
        const method = usuarioId == "0" ? "POST" : "PUT";
        fetch('http://localhost:8000/api/users/register', {
            method: method,
            headers: {
                'Accept': 'application/json', //MimeType
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(insertusuario)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            debugger;
            if (!data) {
                msgError.innerHTML = data.message;
                msgError.style.display = "block"
                return;
            }
            document.location.href = "ListaUsuarios.html?msg=ok_usuario_saved";

        });
    })


})();
function isEmailValid(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function isPasswordValid(pass) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(pass);
}





