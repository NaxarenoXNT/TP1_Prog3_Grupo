// 1. Recuperar el usuario guardado en el login
const usuario = JSON.parse(sessionStorage.getItem("usuario"));

// 2. Si no hay sesión, redirigir al login
if (!usuario) {
    window.location.href = "./login.html";
}

// 3. Fetch al backend usando el id del usuario logueado
const cargarPerfil = async () => {
    try {
        const response = await fetch(`https://tp3-prog3-grupo8.onrender.com/perfil/${usuario.id}`);

        const data = await response.json();

        if (!response.ok) {
            console.error(data.msg);
            alert("No se pudo cargar el perfil");
            return;
        }

        // 4. Mostrar los datos en el HTML
        document.getElementById("perfil_nombre").textContent = data.nombre + " " + data.apellido;
        document.getElementById("perfil_email").textContent = data.email;
        document.getElementById("perfil_fecha_registro").textContent = data.fechaRegistro;

    } catch (error) {
        console.error("Error de red:", error);
        alert("No se pudo conectar con el servidor");
    }
};

cargarPerfil();

// 5. Botón cerrar sesión
document.getElementById("btnCerrarSesion").addEventListener("click", () => {
    sessionStorage.removeItem("usuario");
    window.location.href = "./login.html";
});