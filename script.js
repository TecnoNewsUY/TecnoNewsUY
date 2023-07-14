fetch('https://raw.githubusercontent.com/TecnoNewsUY/TecnoNewsUY/master/todaslasnoticias/todaslasnoticias.json')
  .then(response => response.json())
  .then(data => {
    const noticiasLista = document.getElementById('noticias-lista');
    const noticiasPorCategoria = {};

    data.forEach(noticia => {
      const categoria = noticia.categoria;
      if (!noticiasPorCategoria.hasOwnProperty(categoria)) {
        noticiasPorCategoria[categoria] = [];
      }
      noticiasPorCategoria[categoria].push(noticia);
    });

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
