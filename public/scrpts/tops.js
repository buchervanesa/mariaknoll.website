document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');
    const TopsContainer = document.getElementById('TopsContainer');
  
    // Datos de ejemplo de pantalones y tops (reemplaza con tus datos reales)
    const tops = [
      { nombre: 'Top 1', precio: '$40', imagen: 'https://www.distritomoda.com.ar/sites/default/files/styles/producto_interior/public/imagenes/26990e3b-27d4-43bd-bb48-c707916bac3d_1691511832.jpg?itok=jxeHRtKC' },
      { nombre: 'Top 2', precio: '$45', imagen: 'https://www.distritomoda.com.ar/sites/default/files/styles/producto_interior/public/imagenes/26990e3b-27d4-43bd-bb48-c707916bac3d_1691511832.jpg?itok=jxeHRtKC' },
      { nombre: 'Top 3', precio: '$30', imagen: 'https://www.distritomoda.com.ar/sites/default/files/styles/producto_interior/public/imagenes/26990e3b-27d4-43bd-bb48-c707916bac3d_1691511832.jpg?itok=jxeHRtKC' },
      { nombre: 'Top 4', precio: '$35', imagen: 'https://www.distritomoda.com.ar/sites/default/files/styles/producto_interior/public/imagenes/26990e3b-27d4-43bd-bb48-c707916bac3d_1691511832.jpg?itok=jxeHRtKC' },
      
    ];
  
    // Función para mostrar o minimizar los tops
    function toggleTops() {
      if (TopsContainer.style.display === 'block') {
        TopsContainer.style.display = 'none';
        menu.classList.remove('active');
      } else {
        TopsContainer.style.display = 'block';
        menu.classList.add('active');
      }
    }
  
    // Función para mostrar los tops
    function mostrarTops() {
      // Limpiar el contenedor antes de mostrar los tops
      TopsContainer.innerHTML = '';
      // Mostrar los tops
      tops.forEach(item => {
        const itemHTML = `
          <div class="card">
            <img src="${item.imagen}" class="card-img-top" alt="${item.nombre}">
            <div class="card-body">
              <h5 class="card-title">${item.nombre}</h5>
              <p class="card-text">Precio: ${item.precio}</p>
            </div>
          </div>
        `;
        TopsContainer.innerHTML += itemHTML;
      });
      // Mostrar o minimizar los tops
      toggleTops();
    }
  
    // Evento click para mostrar o minimizar los tops al presionar el botón correspondiente
    const topsBtn = document.getElementById('TopsBtn');
    topsBtn.addEventListener('click', function() {
      mostrarTops();
    });
  
    // Evento click para cerrar el menú desplegable si se hace clic fuera de él
    document.addEventListener('click', function(event) {
      if (!menu.contains(event.target) && menu.classList.contains('active')) {
        toggleTops();
      }
    });
  
    // Evento click para abrir y cerrar el menú desplegable al hacer clic en el botón hamburguesa
    menuBtn.addEventListener('click', function() {
      menu.classList.toggle('active');
    });
  });
  