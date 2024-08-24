document.addEventListener("DOMContentLoaded", (event) => {
    let loginBtn = document.getElementById("loginBtn");
    loginBtn.addEventListener("click", () => {
        let usuario = document.getElementById("usuario").value;
        let contraseña = document.getElementById("contraseña").value;

        if (usuario !== "" && contraseña !== "") {
            
            localStorage.setItem("usuario", JSON.stringify(usuario));
            localStorage.setItem("contraseña", JSON.stringify(contraseña));

            window.location.href = "index.html";
        } else {
            alert("Por favor, complete todos los campos.");
        }
    });
});
