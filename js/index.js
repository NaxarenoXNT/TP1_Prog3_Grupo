const BASE_URL = "https://tp3-prog3-grupo8.onrender.com"

const modal = document.getElementById("modalJuegos")
const tituloJuegos = document.getElementById("tituloJuegos")
const listaJuegos = document.getElementById("listaJuegos")

function abrirModal(juegos, titulo) {
    tituloJuegos.textContent = titulo
    listaJuegos.innerHTML = juegos.map(j => `
        <div class="modal_juego_card">
            <p class="modal_juego_categoria">${j.categoria}</p>
            <p class="modal_juego_nombre">${j.nombre}</p>
            <p class="modal_juego_precio_original">$${j.precioOriginal.toFixed(2)}</p>
            <p class="modal_juego_precio_oferta">$${j.precioOferta.toFixed(2)}</p>
        </div>
    `).join("")
    modal.classList.add("activo")
}

document.getElementById("cerrarModal").addEventListener("click", () => {
    modal.classList.remove("activo")
})

modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("activo")
})

document.getElementById("btnOfertas").addEventListener("click", async () => {
    try {
        const res = await fetch(`${BASE_URL}/juegos`)
        const juegos = await res.json()
        abrirModal(juegos, "Todas las Ofertas")
    } catch (error) {
        alert("No se pudieron cargar las ofertas")
    }
})

document.querySelectorAll(".card_index").forEach(card => {
    card.addEventListener("click", async () => {
        const categoria = card.dataset.categoria
        try {
            const res = await fetch(`${BASE_URL}/juegos/categoria/${encodeURIComponent(categoria)}`)
            if (!res.ok) {
                alert("No hay juegos en esta categoría")
                return
            }
            const juegos = await res.json()
            abrirModal(juegos, `Categoría: ${categoria}`)
        } catch (error) {
            alert("No se pudieron cargar los juegos")
        }
    })
})
