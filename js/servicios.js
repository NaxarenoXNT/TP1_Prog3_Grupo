const imagenesServicios = {
    1:  { img: "../Assets/img/venta-juegos.png",    alt: "Venta de Juegos" },
    2:  { img: "../Assets/img/venta-hardware.png",  alt: "Venta de Hardware" },
    3:  { img: "../Assets/img/soporte-tecnico.png", alt: "Soporte Técnico" },
    4:  { img: "../Assets/img/comunidad-foros.png", alt: "Comunidad y Foros" },
};

const IMAGEN_DEFAULT = { img: "../Assets/img/icono.png", alt: "Servicio Steam" };

const formatearPrecio = (precio) =>
    precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" });

const cargarServicios = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/servicios");
        const servicios = await response.json();

        if (!response.ok) {
            console.error(servicios.msg);
            alert("No se pudo cargar los servicios");
            return;
        }

        const contenedor = document.querySelector(".services-container");
        contenedor.innerHTML = ""; // Limpiar cards hardcodeadas

        servicios.forEach((servicio) => {
            const visual = imagenesServicios[servicio.id] || IMAGEN_DEFAULT;

            const card = document.createElement("div");
            card.classList.add("service-card");
            card.innerHTML = `
                <h2>${servicio.nombre}</h2>
                <img src="${visual.img}" alt="${visual.alt}">
                <p>${servicio.descripcion}</p>
                <p class="servicio_precio">${formatearPrecio(servicio.precio)}</p>
            `;

            contenedor.appendChild(card);
        });

    } catch (error) {
        console.error("Error de red:", error);
        alert("No se pudo conectar con el servidor");
    }
};

cargarServicios();