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
      mostrarNoticiasEnPaginas(noticiasPorCategoria);
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
      const noticiaElement = document.createElement('div');
      noticiaElement.classList.add('noticia');

      const imagenElement = document.createElement('img');
      imagenElement.src = noticia.imagen;
      imagenElement.alt = noticia.titulo;
      imagenElement.classList.add('noticia-imagen');

      const contenidoElement = document.createElement('div');
      contenidoElement.classList.add('noticia-contenido');

      const tituloElement = document.createElement('h3');
      tituloElement.classList.add('noticia-titulo');

      const enlaceElement = document.createElement('a');
      enlaceElement.href = generarEnlace("index", noticia.categoria, noticia.titulo);
      enlaceElement.target = "_blank";
      enlaceElement.textContent = noticia.titulo;

      tituloElement.appendChild(enlaceElement);

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

      noticiasLista.appendChild(noticiaElement);
    });
  }

  // Función para mostrar las noticias en las páginas correspondientes
  function mostrarNoticiasEnPaginas(noticiasPorCategoria) {
    const categorias = Object.keys(noticiasPorCategoria);

    categorias.forEach(categoria => {
      const noticias = noticiasPorCategoria[categoria];
      const categoriaElement = document.getElementById(`categoria-${categoria}`);
      const noticiasListaElement = categoriaElement ? categoriaElement.querySelector('.noticias-lista') : null;

      if (!noticiasListaElement) {
        console.error(`Error: No se encontró el elemento '.noticias-lista' para la categoría ${categoria}`);
        return;
      }

      noticias.forEach(noticia => {
        const noticiaElement = document.createElement('div');
        noticiaElement.classList.add('noticia');

        const imagenElement = document.createElement('img');
        imagenElement.src = noticia.imagen;
        imagenElement.alt = noticia.titulo;
        imagenElement.classList.add('noticia-imagen');

        const contenidoElement = document.createElement('div');
        contenidoElement.classList.add('noticia-contenido');

        const tituloElement = document.createElement('h3');
        tituloElement.classList.add('noticia-titulo');

        const enlaceElement = document.createElement('a');
        enlaceElement.href = generarEnlace(categoria, noticia.categoria, noticia.titulo);
        enlaceElement.target = "_blank";
        enlaceElement.textContent = noticia.titulo;

        tituloElement.appendChild(enlaceElement);

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

        noticiasListaElement.appendChild(noticiaElement);
      });
    });
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

  // Función para generar el enlace con el formato deseado
  function generarEnlace(categoria, categoriaId, titulo) {
    const url = `https://tecnonewsuy.github.io/TecnoNewsUY/page${categoriaId}.html`;
    const tituloSlug = slugify(titulo);
    return `${url}/${tituloSlug}`;
  }

  // Función para convertir un texto en formato slug
  function slugify(text) {
    return text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  }
});

