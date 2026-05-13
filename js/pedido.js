document.getElementById("realizar-pedido").addEventListener("submit", (e) => {
    e.preventDefault();

    alert("¡Pedido realizado con éxito! Nos pondremos en contacto lo antes posible.");
    
    e.target.reset();
});