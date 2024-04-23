async function renderizarProductos() {
    const productosContainer = document.getElementById('productosContainer');
    productosContainer.innerHTML = '';

    const productos = await obtenerProductos();

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('card');

        const imagen = document.createElement('img');
        imagen.src = `http://localhost:5000/${producto.imagen}`;
        imagen.alt = producto.nombre;

        const nombre = document.createElement('h2');
        nombre.textContent = producto.nombre;

        const precio = document.createElement('p');
        precio.textContent = `$${producto.precio}`;

        card.appendChild(imagen);
        card.appendChild(nombre);
        card.appendChild(precio);

        productosContainer.appendChild(card);
    });
}

window.addEventListener('load', renderizarProductos);
</script>
</body>
</html>
