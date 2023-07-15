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

      // Agregar enlaces a los títulos de las noticias
      noticias.forEach(noticia => {
        const titulo = noticiasLista.querySelector(`[data-titulo="${noticia.titulo}"] .noticia-titulo`);
        const categoria = noticiasLista.dataset.categoria;

        const noticiasMismaCategoria = data.filter(noticia => noticia.categoria.includes(categoria));

        const enlace = document.createElement('a');
        enlace.href = `page${categoria}.html#${noticiasMismaCategoria.indexOf(noticia) + 1}`;
        enlace.innerText = titulo.innerText;

        titulo.innerHTML = '';
        titulo.appendChild(enlace);
      });

      // Agregar enlaces a los títulos de las noticias en las páginas 1, 2 y 3
      const noticiasPaginas = document.querySelectorAll('.noticias-pagina');

      noticiasPaginas.forEach(pagina => {
        const tituloNoticia = pagina.querySelector('.noticia-titulo');
        const categoriaPagina = pagina.dataset.categoria;

        const noticiasMismaCategoriaPagina = data.filter(noticia => noticia.categoria.includes(categoriaPagina));

        const enlacePagina = document.createElement('a');
        enlacePagina.href = `page${categoriaPagina}.html#${noticiasMismaCategoriaPagina.indexOf(tituloNoticia.parentElement) + 1}`;
        enlacePagina.innerText = tituloNoticia.innerText;

        tituloNoticia.innerHTML = '';
        tituloNoticia.appendChild(enlacePagina);
      });
    })
    .catch(error => {
      mostrarError("Error al cargar las noticias: " + error);
    });

  function obtenerUltimasNoticias(noticiasPorCategoria, cantidad) {
    const noticiasUnicas = [];
    const noticiasVistas = new Set();
    let contador = 0;

    for (const categoria in noticiasPorCategoria) {
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
    contenedor.innerHTML = '';

    noticias.forEach(noticia => {
      const divNoticia = document.createElement('div');
      divNoticia.classList.add('noticia');
      divNoticia.dataset.titulo = noticia.titulo;

      const titulo = document.createElement('h3');
      titulo.classList.add('noticia-titulo');
      titulo.textContent = noticia.titulo;

      const contenido = document.createElement('p');
      contenido.textContent = noticia.contenido;

      const imagen = document.createElement('img');
      imagen.src = noticia.imagen;
      imagen.alt = noticia.titulo;

      divNoticia.appendChild(titulo);
      divNoticia.appendChild(contenido);
      divNoticia.appendChild(imagen);

      contenedor.appendChild(divNoticia);
    });
  }

  function mostrarError(mensaje) {
    const errorElement = document.createElement('p');
    errorElement.classList.add('error');
    errorElement.textContent = mensaje;

    noticiasLista.innerHTML = '';
    noticiasLista.appendChild(errorElement);
  }
});
