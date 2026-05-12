const datosVisuales = {
    1: { img: "../Assets/img/Coboltprogramer.jpg",           alt: "Foto de Nazareno" },
    2: { img: "../Assets/img/incognito.jpg",                 alt: "Foto de Alejo" },
    3: { img: "../Assets/img/glugluglu.jpg",                 alt: "Foto de Julián" },
    4: { img: "../Assets/img/Explicandoelbugalpato.png",     alt: "Foto de Gianfranco" },
    5: { img: "../Assets/img/YoUnDiaAntesDelExamen.jpg",     alt: "Foto de Román" },
    6: { img: "../Assets/img/ArregleElBugPeroBugeeLaVida.png", alt: "Foto de Nicolas" },
};

const cargarEquipo = async () => {
    try {
        const response = await fetch("https://tp3-prog3-grupo8.onrender.com/equipo");

        const equipo = await response.json();

        if (!response.ok) {
            console.error(equipo.msg);
            alert("No se pudo cargar el equipo");
            return;
        }

        const grilla = document.querySelector(".equipo_grilla");
        grilla.innerHTML = ""; // Limpiar cards hardcodeadas

        equipo.forEach((miembro) => {
            const visual = datosVisuales[miembro.id] || {
                img: "../Assets/img/incognito.jpg",
                alt: "Foto de integrante",
            };

            const card = document.createElement("div");
            card.classList.add("miembro");
            card.innerHTML = `
                <img src="${visual.img}" alt="${visual.alt}">
                <h3>${miembro.nombre} ${miembro.apellido}</h3>
                <p>Estudiante de la Tecnicatura Universitaria en Programación en la UTN.</p>
                <p>${miembro.rol}</p>
            `;

            grilla.appendChild(card);
        });

    } catch (error) {
        console.error("Error de red:", error);
        alert("No se pudo conectar con el servidor");
    }
};

cargarEquipo();