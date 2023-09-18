function getUserInSession(){
    const userInSession = localStorage.getItem('userInSession');
    if (!userInSession)
        return null;
    let user = null;
    try {
        user = JSON.parse(userInSession);
    }catch (exx){
        console.error("error al obtener Usuario")
    }
    return user;


}
function setUserInSession(user){
    if (user){
        localStorage.setItem('userInSession', JSON.stringify(user));
    }else{
        localStorage.removeItem('userInSession')
    }

}
function salir(){
    setUserInSession(null);
    window.location.href = "index.html"
}