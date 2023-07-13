window.addEventListener('DOMContentLoaded', () => {
  // Obtener la sección de Última Hora
  const ultimaHoraSection = document.getElementById('ultima-hora-section');

  // Obtener el contenedor de las noticias de Última Hora
  const noticiasUltimaHoraContainer = document.getElementById('noticias-ultima-hora');

  // Obtener el enlace de Última Hora
  const ultimaHoraLink = document.getElementById('ultima-hora');

  // Array de noticias de ejemplo
  const noticias = [
    {
      titulo: 'Noticia 1',
      contenido: 'Contenido de la Noticia 1'
    },
    {
      titulo: 'Noticia 2',
      contenido: 'Contenido de la Noticia 2'
    },
    {
      titulo: 'Noticia 3',
      contenido: 'Contenido de la Noticia 3'
    }
  ];

  // Función para mostrar las últimas noticias en la sección de Última Hora
  const mostrarUltimasNoticias = () => {
    // Vaciar el contenedor de noticias de Última Hora
    noticiasUltimaHoraContainer.innerHTML = '';

    // Crear y agregar elementos de noticias al contenedor
    noticias.forEach(noticia => {
      const noticiaElement = document.createElement('div');
      noticiaElement.innerHTML = `
        <h3>${noticia.titulo}</h3>
        <p>${noticia.contenido}</p>
      `;
      noticiasUltimaHoraContainer.appendChild(noticiaElement);
    });
  };

  // Cargar las últimas noticias al cargar la página
  mostrarUltimasNoticias();

  // Eliminar las noticias anteriores cuando se hace clic en Última Hora
  ultimaHoraLink.addEventListener('click', () => {
    // Vaciar el contenedor de noticias de Última Hora
    noticiasUltimaHoraContainer.innerHTML = '';
  });
});
