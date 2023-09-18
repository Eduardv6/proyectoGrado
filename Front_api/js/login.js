(function(){

    const userInSession = getUserInSession();
    if (userInSession){
        window.location.href = 'home.html';
        return;
    }
    document.body.style.display = "block";
    document.querySelector("#btn-login").addEventListener("click",login);
})();
async function login(e) {
    e.preventDefault()

    const inputMail = document.querySelector("#inputEmail");
    const inputPassword = document.querySelector("#inputPassword");

    const validationMail = document.querySelector("#validation-email");
    const validationPassword = document.querySelector("validation-password");
    const msglogin = document.querySelector("#msg-error-login");
    msglogin.style.display = "none";

    let hasError = false;
    debugger;

    if (inputMail.value.trim() === "") {
        hasError = true;
        validationMail.style.display = ("block");
    } else {
        validationMail.style.display = ("none");
    }

    if (inputPassword.value.trim() === "") {
        hasError = true;
        validationPassword.style.display = ("block");
    } else {
        
    }

    if (hasError) {
        return;
    }
    debugger;
    const userRequest = {
        "email": inputMail.value,
        "password": inputPassword.value
    }
    debugger;
    try {
        const response = await fetch("http://localhost:8000/api/login/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(userRequest)
        });
        if (response.ok){
            const userInSession = await response.json();
            setUserInSession(userInSession);
            window.location.href = 'home.html'
        }else{
            msglogin.style.display = "block";
        }
        debugger;
    } catch (ex) {
        console.log(ex)
        console.error(ex)
    }
    debugger;

}