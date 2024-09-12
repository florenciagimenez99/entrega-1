var nombreUsuario = localStorage.getItem('usuario');

if (nombreUsuario) {
    document.getElementById('usuarioBarra').textContent = nombreUsuario;
}
