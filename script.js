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
      // Filtrar las noticias por categoría
      const noticiasPorCategoria = {};

      data.forEach(noticia => {
        const categoria = noticia.categoria;
        if (!noticiasPorCategoria.hasOwnProperty(categoria)) {
          noticiasPorCategoria[categoria] = [];
        }
        if (noticiasPorCategoria[categoria].length < 5) {
          noticiasPorCategoria[categoria].push(noticia);
        }
      });

      // Mostrar las últimas noticias en la página index.html
      mostrarUltimasNoticias(noticiasPorCategoria);

      // Mostrar las noticias en las páginas correspondientes
      const currentPage = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
      const categoria = currentPage.includes('page') ? currentPage.replace('page', '') : '';
      mostrarNoticiasEnPagina(noticiasPorCategoria, categoria);
    })
    .catch(error => {
      mostrarError("Error al cargar las noticias: " + error);
    });

  // Función para mostrar las últimas noticias en la sección "Últimas noticias" de la página index.html
  function mostrarUltimasNoticias(noticiasPorCategoria) {
    const noticias = [];
    for (let categoria in noticiasPorCategoria) {
      const noticiasCategoria = noticiasPorCategoria[categoria];
      noticiasCategoria.forEach(noticia => {
        if (noticias.length < 3 && !noticias.some(n => n.titulo === noticia.titulo)) {
          noticias.push(noticia);
        }
      });
    }

    noticias.forEach(noticia => {
      const noticiaElement = crearElementoNoticia(noticia);
      noticiasLista.appendChild(noticiaElement);
    });
  }

 // Función para mostrar las noticias en la página correspondiente
  function mostrarNoticiasEnPagina(noticiasPorCategoria, categoria) {
    if (!categoria || !noticiasPorCategoria.hasOwnProperty(categoria)) {
      mostrarError("Error: No se encontró la categoría de noticias");
      return;
    }

    const noticiasCategoria = noticiasPorCategoria[categoria];

    noticiasLista.innerHTML = '';

    noticiasCategoria.forEach(noticia => {
      const noticiaElement = crearElementoNoticia(noticia);
      noticiasLista.appendChild(noticiaElement);
    });
  }


  // Función para crear el elemento de noticia
  function crearElementoNoticia(noticia) {
    const noticiaElement = document.createElement('div');
    noticiaElement.classList.add('noticia');

    const imagenElement = document.createElement('img');
    imagenElement.src = noticia.imagen;
    imagenElement.alt = noticia.titulo;
    imagenElement.classList.add('noticia-imagen');

    const contenidoElement = document.createElement('div');
    contenidoElement.classList.add('noticia-contenido');

    const tituloElement = document.createElement('h3');
    tituloElement.textContent = noticia.titulo;
    tituloElement.classList.add('noticia-titulo');

    const cuerpoElement = document.createElement('p');
    cuerpoElement.textContent = noticia.contenido.substring(0, 100) + '...';

    contenidoElement.appendChild(tituloElement);
    contenidoElement.appendChild(cuerpoElement);

    noticiaElement.appendChild(imagenElement);
    noticiaElement.appendChild(contenidoElement);

    // Agregar evento de click para mostrar la noticia completa
    noticiaElement.addEventListener('click', () => {
      mostrarNoticiaCompleta(noticia);
    });

    return noticiaElement;
  }

  // Función para mostrar la noticia completa
  function mostrarNoticiaCompleta(noticia) {
    const noticiaCompleta = document.createElement('div');
    noticiaCompleta.classList.add('noticia-completa');

    const tituloElement = document.createElement('h2');
    tituloElement.textContent = noticia.titulo;

    const contenidoElement = document.createElement('p');
    contenidoElement.textContent = noticia.contenido;

    noticiaCompleta.appendChild(tituloElement);
    noticiaCompleta.appendChild(contenidoElement);

    noticiasLista.innerHTML = '';
    noticiasLista.appendChild(noticiaCompleta);
  }

  // Función para mostrar un mensaje de error
  function mostrarError(mensaje) {
    const errorElement = document.createElement('p');
    errorElement.classList.add('error');
    errorElement.textContent = mensaje;

    noticiasLista.innerHTML = '';
    noticiasLista.appendChild(errorElement);
  }
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
