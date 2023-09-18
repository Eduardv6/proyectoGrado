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
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const nombre = urlParams.get('name');

    const Name = document.querySelector("#name").value
    const Email = document.querySelector("#email").value
    const Password = document.querySelector("#password").value
    const SecondPassword = document.querySelector("#secondPassword").value
    const Grado = document.querySelector("#inputGrado").value
    const Rol = document.querySelector("#inputRol").value

    
    const valName = document.querySelector("#validation-nombre");
    const valEmail = document.querySelector("#validation-email");
    const valPassword = document.querySelector("#validation-password");
    const valSecondPass = document.querySelector("#validation-secondPassword");
    const valGrado = document.querySelector("#validation-grado");
    const valRol = document.querySelector("#validation-rol");


    const msgError = document.querySelector("#msg-error-regis")

    valName.style.display = "none";
    valEmail.style.display = "none";
    valPassword.style.display = "none";
    valSecondPass.style.display = "none";
    valGrado.style.display = "none";
    valRol.style.display = "none";
    
    debugger;
    let hasError = false;

    if (Name == "") {
        hasError = true;
        valName.style.display = "block"
    }

    if (Email == "") {
        hasError = true;
        valEmail.style.display = "block"
    } else if (!isEmailValid(Email)) {
        hasError = true;
        valEmail.innerHTML = "El correo electrónico no es válido"
        valEmail.style.display = "block"
    }

    if (Password == "") {
        hasError = true;
        valPassword.style.display = "block"
    } else if (!isPasswordValid(Password)) {
        hasError = true;
        valPassword.innerHTML = "La contraseña debe tener minimo ocho caracteres, al menos una letra y un número"
        valPassword.style.display = "block"
    }

    if (SecondPassword == "") {
        hasError = true;
        valSecondPass.style.display = "block"
    }
    if (Password != SecondPassword) {
        hasError = true;
        valPassword.innerHTML = "Las contraseñas no coinciden"
        valSecondPass.innerHTML = "Las contraseñas no coinciden"
        valPassword.style.display = "block"
        valSecondPass.style.display = "block"
    }

    if (Grado == "") {
        hasError = true;
        valGrado.style.display = "block"
    }
    if (Rol == "") {
        hasError = true;
        valRol.style.display = "block"
    }

    if (hasError) {
        return;
    }
    debugger;

    const usuario = {
        name: Name,
        email: Email,
        password: Password,
        grado: Grado,
        rol: Rol
    }
    debugger;
    
    window.alert(id);
    fetch(`http://localhost:8000/api/users/update/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json', //MimeType
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(usuario)

    }).then((response) => {
        document.location.href = "ListaUsuarios.html";
        return response.json();
    }).then((data) => {
        if (!data.isOK) {
            msgError.innerHTML = data.message;
            window.alert(data.message);
            msgError.style.display = "block"
            return;
        }
        debugger;
        document.location.href = "index.html";
    });
});

function isEmailValid(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function isPasswordValid(pass) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(pass);
}






