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
//create function to upload files of different formats, such as pdf, mp3, jpg
function uploadFile(){
    let photo = document.getElementById("image-file").files[0];
    let formData = new FormData();
        
    formData.append("image", photo);
    fetch('api/anuncio/upload', {
        method: "POST", 
        body: formData
    }).then((response) =>{
        return response.json();
    }).then((data) => {
        
       if(!data.isOK){
            alert("No se pudo subir el archivo");
            return;
       }

       //data.message contiene el FileId que se subió
       const fileId = data.message;
       document.querySelector("#imageFileId").value = fileId;
       const image = document.querySelector("#image");
       image.src = "api/anuncio/image/" + fileId;

    });
}
    


