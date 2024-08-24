document.addEventListener("DOMContentLoaded", (event) => {
    let loginBtn = document.getElementById("loginBtn");

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            let usuario = document.getElementById("usuario").value;
            let contraseña = document.getElementById("contraseña").value;
           
            if (usuario.trim() !== "" && contraseña.trim() !== "") {
                
                localStorage.setItem("loggedIn", "true");
    
                window.location.href = "index.html";
            } else {
                alert("Por favor, complete todos los campos.");
            }
        });
    }
});
