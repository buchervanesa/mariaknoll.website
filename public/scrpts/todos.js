document.addEventListener('DOMContentLoaded', function() {
  const productos = {
    vestidos: [
      { nombre: 'Vestido 1', precio: '$50', imagen: 'https://via.placeholder.com/150' },
      { nombre: 'Vestido 2', precio: '$60', imagen: 'https://via.placeholder.com/150' }
    ],
    pantalones: [
      { nombre: 'Pantalón 1', precio: '$40', imagen: 'https://via.placeholder.com/150' },
      { nombre: 'Pantalón 2', precio: '$45', imagen: 'https://via.placeholder.com/150' }
    ],
    tops: [
      { nombre: 'Top 1', precio: '$30', imagen: 'https://via.placeholder.com/150' },
      { nombre: 'Top 2', precio: '$35', imagen: 'https://via.placeholder.com/150' }
    ]
  };

  function renderizarProductos(contenedor, productos) {
    contenedor.innerHTML = ''; // Limpiar contenedor
    productos.forEach(producto => {
      const productoHTML = `
        <div class="card">
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">Precio: ${producto.precio}</p>
          </div>
        </div>
      `;
      contenedor.innerHTML += productoHTML;
    });
  }

  function mostrarProductos(contenedor, categoria) {
    if (categoria === 'todos') {
      renderizarProductos(contenedor, [...productos.vestidos, ...productos.pantalones, ...productos.tops]);
    } else {
      renderizarProductos(contenedor, productos[categoria]);
    }
  }

  document.getElementById('todosBtn').addEventListener('click', function() {
    mostrarProductos(document.getElementById('allProductsContainer'), 'todos');
  });
  document.getElementById('vestidosBtn').addEventListener('click', function() {
    mostrarProductos(document.getElementById('allProductsContainer'), 'vestidos');
  });
  document.getElementById('pantalonesBtn').addEventListener('click', function() {
    mostrarProductos(document.getElementById('allProductsContainer'), 'pantalones');
  });
  document.getElementById('TopsBtn').addEventListener('click', function() {
    mostrarProductos(document.getElementById('allProductsContainer'), 'tops');
  });

  // Mostrar todos los productos al cargar la página
  mostrarProductos(document.getElementById('allProductsContainer'), 'todos');
});