document.getElementById("formRegistro").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const password = document.getElementById("password").value;
    const confirmarPassword = document.getElementById("confirmarPassword").value;

    // Validar que las contraseñas coincidan antes de llamar al backend
    if (password !== confirmarPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    try {
        const response = await fetch("https://tp3-prog3-grupo8.onrender.com/registro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, email, fechaNacimiento, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.msg || "Error al registrarse");
            return;
        }

        alert("¡Cuenta creada con éxito! Ahora podés iniciar sesión.");
        window.location.href = "./login.html";

    } catch (error) {
        console.error("Error de red:", error);
        alert("No se pudo conectar con el servidor");
    }
});