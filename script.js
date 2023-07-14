window.addEventListener('DOMContentLoaded', () => {
  const noticiasLista = document.getElementById('noticias-lista');

  if (!noticiasLista) {
    console.error("Error: No se encontró el elemento con el ID 'noticias-lista'");
    return;
  }

  fetch('https://raw.githubusercontent.com/TecnoNewsUY/TecnoNewsUY/master/todaslasnoticias/todaslasnoticias.json')
    .then(response => response.json())
    .then(data => {
      const noticiasPorCategoria = {};

      data.forEach(noticia => {
        const categoria = noticia.categoria;
        if (!noticiasPorCategoria.hasOwnProperty(categoria)) {
          noticiasPorCategoria[categoria] = [];
        }
        noticiasPorCategoria[categoria].push(noticia);
      });

      const noticias = obtenerUltimasNoticias(noticiasPorCategoria, 3);
      mostrarNoticias(noticias, noticiasLista);
    })
    .catch(error => {
      mostrarError("Error al cargar las noticias: " + error);
    });

  function obtenerUltimasNoticias(noticiasPorCategoria, cantidad) {
    const noticiasUnicas = [];
    const noticiasVistas = new Set();
    let contador = 0;

    for (let categoria in noticiasPorCategoria) {
      const noticiasCategoria = noticiasPorCategoria[categoria];
      for (let i = noticiasCategoria.length - 1; i >= 0; i--) {
        const noticia = noticiasCategoria[i];
        if (!noticiasVistas.has(noticia.titulo)) {
          noticiasUnicas.push(noticia);
          noticiasVistas.add(noticia.titulo);
          contador++;
        }

        if (contador === cantidad) {
          break;
        }
      }

      if (contador === cantidad) {
        break;
      }
    }

    return noticiasUnicas;
  }

  function mostrarNoticias(noticias, contenedor) {
    noticias.forEach(noticia => {
      const noticiaElement = crearElementoNoticia(noticia);
      contenedor.appendChild(noticiaElement);
    });
  }

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

    noticiaElement.addEventListener('click', () => {
      mostrarNoticiaCompleta(noticia);
    });

    return noticiaElement;
  }

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

  function mostrarError(mensaje) {
    const errorElement = document.createElement('p');
    errorElement.classList.add('error');
    errorElement.textContent = mensaje;

    noticiasLista.innerHTML = '';
    noticiasLista.appendChild(errorElement);
  }
});

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

