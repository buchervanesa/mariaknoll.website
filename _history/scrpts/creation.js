document.addEventListener('DOMContentLoaded', () => {
    const formCrearVestido = document.getElementById('formCrearVestido');
    formCrearVestido.addEventListener('submit', async (event) => {
      event.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const precio = document.getElementById('precio').value;
      try {
        const response = await fetch('http://localhost:3000/api/vestidos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre, precio }),
        });
        if (!response.ok) {
          throw new Error('Error al crear el vestido');
        }
        const data = await response.json();
        alert(data.message);
        formCrearVestido.reset();
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Error al crear el vestido. Por favor, intenta nuevamente.');
      }
    });
  });
  