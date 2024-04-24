document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.querySelector('.menu');
  const vestidosContainer = document.getElementById('vestidosContainer');

  // Datos de ejemplo de vestidos (reemplaza con tus datos reales)
  const vestidos = [
    { nombre: 'Vestido 1', precio: '$50', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAfpcD8LvEJX9oRFdj3op2Wglsagb3baCB4gR4bURihg&s' },
    { nombre: 'Vestido 2', precio: '$60', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAfpcD8LvEJX9oRFdj3op2Wglsagb3baCB4gR4bURihg&s' },
    { nombre: 'Vestido 3', precio: '$70', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAfpcD8LvEJX9oRFdj3op2Wglsagb3baCB4gR4bURihg&s' },
    { nombre: 'Vestido 4', precio: '$80', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAfpcD8LvEJX9oRFdj3op2Wglsagb3baCB4gR4bURihg&s' },
    { nombre: 'Vestido 5', precio: '$90', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAfpcD8LvEJX9oRFdj3op2Wglsagb3baCB4gR4bURihg&s' },
    { nombre: 'Vestido 6', precio: '$100', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAfpcD8LvEJX9oRFdj3op2Wglsagb3baCB4gR4bURihg&s' }
  ];

  // Función para mostrar o minimizar los vestidos
  function toggleVestidos() {
    if (vestidosContainer.style.display === 'block') {
      vestidosContainer.style.display = 'none';
      menu.classList.remove('active');
    } else {
      vestidosContainer.style.display = 'block';
      menu.classList.add('active');
    }
  }

  // Función para mostrar los vestidos
  function mostrarVestidos() {
    // Limpiar el contenedor antes de mostrar los vestidos
    vestidosContainer.innerHTML = '';
    // Mostrar los 6 vestidos
    vestidos.forEach(vestido => {
      const vestidoHTML = `
        <div class="card">
          <img src="${vestido.imagen}" class="card-img-top" alt="${vestido.nombre}">
          <div class="card-body">
            <h5 class="card-title">${vestido.nombre}</h5>
            <p class="card-text">Precio: ${vestido.precio}</p>
          </div>
        </div>
      `;
      vestidosContainer.innerHTML += vestidoHTML;
    });
    // Mostrar o minimizar los vestidos
    toggleVestidos();
  }

  // Evento click para mostrar o minimizar los vestidos al presionar el botón "Vestidos"
  const vestidosBtn = document.getElementById('vestidosBtn');
  vestidosBtn.addEventListener('click', function() {
    mostrarVestidos();
  });

  // Evento click para cerrar el menú desplegable si se hace clic fuera de él
  document.addEventListener('click', function(event) {
    if (!menu.contains(event.target) && menu.classList.contains('active')) {
      toggleVestidos();
    }
  });

  // Evento click para abrir y cerrar el menú desplegable al hacer clic en el botón hamburguesa
  menuBtn.addEventListener('click', function() {
    menu.classList.toggle('active');
  });
});
