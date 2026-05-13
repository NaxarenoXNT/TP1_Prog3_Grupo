const BASE_URL = "https://tp3-prog3-grupo8.onrender.com"

const seccionJuegos = document.getElementById("seccionJuegos")
const tituloJuegos = document.getElementById("tituloJuegos")
const listaJuegos = document.getElementById("listaJuegos")

function mostrarJuegos(juegos, titulo) {
    tituloJuegos.textContent = titulo
    listaJuegos.innerHTML = juegos.map(j => `
        <div class="oferta_card">
            <p class="oferta_categoria">${j.categoria}</p>
            <p class="oferta_nombre">${j.nombre}</p>
        </div>
    `).join("")
    seccionJuegos.style.display = "block"
    seccionJuegos.scrollIntoView({ behavior: "smooth" })
}

document.getElementById("btnOfertas").addEventListener("click", async () => {
    try {
        const res = await fetch(`${BASE_URL}/juegos`)
        const juegos = await res.json()
        mostrarJuegos(juegos, "Todas las Ofertas")
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
            mostrarJuegos(juegos, `Categoría: ${categoria}`)
        } catch (error) {
            alert("No se pudieron cargar los juegos")
        }
    })
})
