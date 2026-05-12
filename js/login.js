document.getElementById("formLogin").addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita que el form recargue la página

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("https://tp3-prog3-grupo8.onrender.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            // El backend devolvió 400 o 401
            alert(data.msg || "Error al iniciar sesión");
            return;
        }

        // Guardar usuario en sessionStorage para usarlo en perfil.html
        sessionStorage.setItem("usuario", JSON.stringify(data.usuario));

        // Redirigir a perfil
        window.location.href = "./perfil.html";

    } catch (error) {
        console.error("Error de red:", error);
        alert("No se pudo conectar con el servidor");
    }
});