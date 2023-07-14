window.addEventListener('DOMContentLoaded', () => {
  const noticiasLista = document.getElementById('noticias-lista');

  if (!noticiasLista) {
    console.error("Error: No se encontró el elemento con el ID 'noticias-lista'");
    return;
  }

  // Obtener las noticias desde el archivo JSON
  fetch('https://raw.githubusercontent.com/TecnoNewsUY/TecnoNewsUY/master/todaslasnoticias/todaslasnoticias.json')
    .then(response => response.json())
    .then(data => {
      // Filtrar las noticias por categoría y eliminar duplicados
      const noticiasPorCategoria = {};

      data.forEach(noticia => {
        const categoria = noticia.categoria;
        if (!noticiasPorCategoria.hasOwnProperty(categoria)) {
          noticiasPorCategoria[categoria] = [];
        }
        if (!noticiasPorCategoria[categoria].some(n => n.titulo === noticia.titulo)) {
          noticiasPorCategoria[categoria].push(noticia);
        }
      });

      // Obtener las últimas 3 noticias sin repeticiones
      const ultimasNoticias = [];
      for (let categoria in noticiasPorCategoria) {
        const noticiasCategoria = noticiasPorCategoria[categoria];
        if (noticiasCategoria.length > 0) {
          const noticiasOrdenadas = noticiasCategoria.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
          for (let i = 0; i < noticiasOrdenadas.length && ultimasNoticias.length < 3; i++) {
            const noticia = noticiasOrdenadas[i];
            if (!ultimasNoticias.some(n => n.titulo === noticia.titulo)) {
              ultimasNoticias.push(noticia);
            }
          }
        }
      }

      // Mostrar las últimas noticias en la página index.html
      ultimasNoticias.forEach(noticia => {
        const divNoticia = document.createElement('div');
        divNoticia.classList.add('noticia');

        const titulo = document.createElement('h3');
        titulo.textContent = noticia.titulo;

        const contenido = document.createElement('p');
        contenido.textContent = noticia.contenido;

        const imagen = document.createElement('img');
        imagen.src = noticia.imagen;
        imagen.alt = noticia.titulo;

        divNoticia.appendChild(titulo);
        divNoticia.appendChild(contenido);
        divNoticia.appendChild(imagen);

        noticiasLista.appendChild(divNoticia);
      });
    })
    .catch(error => console.log(error));
});

// Limpiador de caché
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado con éxito:', registration.scope);
      })
      .catch(error => {
        console.error('Error al registrar el Service Worker:', error);
      });
  });
}
