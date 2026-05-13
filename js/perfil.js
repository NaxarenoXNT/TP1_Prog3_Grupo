// Recuperar el usuario guardado en el login
const usuario = JSON.parse(sessionStorage.getItem("usuario"));

// Si no hay sesión, redirigir al login
if (!usuario) {
    window.location.href = "./login.html";
}

const cargarPerfil = async () => {
    try {
        const response = await fetch(`https://tp3-prog3-grupo8.onrender.com/perfil/${usuario.id}`);
        const data = await response.json();

        if (!response.ok) {
            console.error(data.msg);
            alert("No se pudo cargar el perfil");
            return;
        }

        // Datos del usuario 
        document.getElementById("perfil_nombre").textContent = data.nombre;
        document.getElementById("perfil_email").textContent = data.email;
        document.getElementById("perfil_fecha_registro").textContent = data.fechaRegistro;

        // Foto de perfil
        const fotoEl = document.getElementById("perfil_foto");
        if (fotoEl && data.foto) {
            fotoEl.src = "../" + data.foto;
            fotoEl.alt = "Foto de " + data.nombre;
        }

        // Ultimos 3 pedidos 
        const listaPedidos = document.getElementById("perfil_pedidos");
        if (listaPedidos) {
            listaPedidos.innerHTML = "";
            if (data.ultimos3Pedidos && data.ultimos3Pedidos.length > 0) {
                data.ultimos3Pedidos.forEach((pedido) => {
                    const li = document.createElement("li");
                    li.classList.add("perfil_pedido_item");
                    li.innerHTML = `
                        <span class="pedido_nombre">${pedido.nombre || pedido.servicio || "Pedido"}</span>
                        <span class="pedido_fecha">${pedido.fecha || ""}</span>
                        <span class="pedido_estado pedido_estado--${(pedido.estado || "pendiente").toLowerCase()}">${pedido.estado || "Pendiente"}</span>
                    `;
                    listaPedidos.appendChild(li);
                });
            } else {
                listaPedidos.innerHTML = '<li class="perfil_sin_pedidos">Aún no realizaste ningún pedido.</li>';
            }
        }

        // Ofertas 
        const contenedorOfertas = document.getElementById("perfil_ofertas");
        if (contenedorOfertas) {
            contenedorOfertas.innerHTML = "";
            if (data.ofertas && data.ofertas.length > 0) {
                data.ofertas.forEach((juego) => {
                    const card = document.createElement("div");
                    card.classList.add("oferta_card");
                    card.innerHTML = `
                        <span class="oferta_categoria">${juego.categoria}</span>
                        <p class="oferta_nombre">${juego.nombre}</p>
                    `;
                    contenedorOfertas.appendChild(card);
                });
            } else {
                contenedorOfertas.innerHTML = "<p>No hay ofertas disponibles.</p>";
            }
        }

    } catch (error) {
        console.error("Error de red:", error);
        alert("No se pudo conectar con el servidor");
    }
};

cargarPerfil();

// Botón cerrar sesión
document.getElementById("btnCerrarSesion").addEventListener("click", () => {
    sessionStorage.removeItem("usuario");
    window.location.href = "./login.html";
});