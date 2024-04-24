/*const pantalones = [
    { nombre: 'Pantalón 1', precio: '$40', imagen: 'URL_IMAGEN' },
    { nombre: 'Pantalón 2', precio: '$45', imagen: 'URL_IMAGEN' },
    { nombre: 'pantalon3', precio: '$30', imagen: 'URL_IMAGEN' },
    { nombre: 'pantalon5', precio: '$35', imagen: 'URL_IMAGEN' }
  ];
  function mostrarPantalones() {
    const pantalonesContainer = document.getElementById('pantalonesContainer');
    // Limpiar el contenedor antes de mostrar los pantalones y tops
    pantalonesContainer.innerHTML = '';
    // Mostrar los pantalones y tops
    pantalones.forEach(item => {
      const itemHTML = `
        <div class="card">
          <img src="${item.imagen}" class="card-img-top" alt="${item.nombre}">
          <div class="card-body">
            <h5 class="card-title">${item.nombre}</h5>
            <p class="card-text">Precio: ${item.precio}</p>
          </div>
        </div>
      `;
      pantalonesContainer.innerHTML += itemHTML;
    });
  }*/
  document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');
    const pantalonesContainer = document.getElementById('pantalonesContainer');
  
    // Datos de ejemplo de pantalones y tops (reemplaza con tus datos reales)
    const pantalones = [
      { nombre: 'Pantalón 1', precio: '$40', imagen: 'https://acdn.mitiendanube.com/stores/001/053/068/products/syntra-11-641d2339dcc4d7e18716668863378259-480-0.jpg' },
      { nombre: 'Pantalón 2', precio: '$45', imagen: 'https://acdn.mitiendanube.com/stores/001/053/068/products/syntra-11-641d2339dcc4d7e18716668863378259-480-0.jpg' },
      { nombre: 'pantalon', precio: '$30', imagen: 'https://acdn.mitiendanube.com/stores/001/053/068/products/syntra-11-641d2339dcc4d7e18716668863378259-480-0.jpg' },
      { nombre: 'pantalon', precio: '$35', imagen: 'https://acdn.mitiendanube.com/stores/001/053/068/products/syntra-11-641d2339dcc4d7e18716668863378259-480-0.jpg' }
    ];
  
    // Función para mostrar o minimizar los pantalones y tops
    function togglePantalones() {
      if (pantalonesContainer.style.display === 'block') {
        pantalonesContainer.style.display = 'none';
        menu.classList.remove('active');
      } else {
        pantalonesContainer.style.display = 'block';
        menu.classList.add('active');
      }
    }
  
    // Función para mostrar los pantalones y tops
    function mostrarPantalones() {
      // Limpiar el contenedor antes de mostrar los pantalones y tops
      pantalonesContainer.innerHTML = '';
      // Mostrar los pantalones y tops
      pantalones.forEach(item => {
        const itemHTML = `
          <div class="card">
            <img src="${item.imagen}" class="card-img-top" alt="${item.nombre}">
            <div class="card-body">
              <h5 class="card-title">${item.nombre}</h5>
              <p class="card-text">Precio: ${item.precio}</p>
            </div>
          </div>
        `;
        pantalonesContainer.innerHTML += itemHTML;
      });
      // Mostrar o minimizar los pantalones y tops
      togglePantalones();
    }
  
    // Evento click para mostrar o minimizar los pantalones y tops al presionar el botón correspondiente
    const pantalonesBtn = document.getElementById('pantalonesBtn');
    pantalonesBtn.addEventListener('click', function() {
      mostrarPantalones();
    });
  
    // Evento click para cerrar el menú desplegable si se hace clic fuera de él
    document.addEventListener('click', function(event) {
      if (!menu.contains(event.target) && menu.classList.contains('active')) {
        togglePantalones();
      }
    });
  
    // Evento click para abrir y cerrar el menú desplegable al hacer clic en el botón hamburguesa
    menuBtn.addEventListener('click', function() {
      menu.classList.toggle('active');
    });
  });
  