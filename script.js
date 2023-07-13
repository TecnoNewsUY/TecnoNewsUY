window.addEventListener('DOMContentLoaded', () => {
    // Obtener la sección de Última Hora
    const ultimaHoraSection = document.getElementById('ultima-hora-section');
  
    // Obtener el contenedor de las noticias de Última Hora
    const noticiasUltimaHoraContainer = document.getElementById('noticias-ultima-hora');
  
    // Obtener el enlace de Última Hora
    const ultimaHoraLink = document.getElementById('ultima-hora');
  
    // Cargar las últimas noticias de Última Hora desde el archivo Python
    fetch('ultimas_noticias.py')
      .then(response => response.text())
      .then(data => {
        // Insertar las noticias en el contenedor
        noticiasUltimaHoraContainer.innerHTML = data;
      })
      .catch(error => {
        console.error('Error al cargar las últimas noticias:', error);
      });
  
    // Eliminar las noticias anteriores cuando se hace clic en Última Hora
    ultimaHoraLink.addEventListener('click', () => {
      // Vaciar el contenedor de noticias de Última Hora
      noticiasUltimaHoraContainer.innerHTML = '';
    });
  });
  