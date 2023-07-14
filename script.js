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
            // Filtrar las noticias por categoría y obtener las últimas 5 noticias de cada categoría
            const noticiasPorCategoria = {};
            const noticiasUltimas = [];

            data.forEach(noticia => {
                const categoria = noticia.categoria;
                if (!noticiasPorCategoria.hasOwnProperty(categoria)) {
                    noticiasPorCategoria[categoria] = [];
                }
                if (noticiasPorCategoria[categoria].length < 5) {
                    noticiasPorCategoria[categoria].push(noticia);
                }

                if (noticiasUltimas.length < 3) {
                    const tituloNoticia = noticia.titulo;
                    const existeNoticia = noticiasUltimas.find(noticia => noticia.titulo === tituloNoticia);
                    if (!existeNoticia) {
                        noticiasUltimas.push(noticia);
                    }
                }
            });

            // Mostrar las últimas noticias en las páginas correspondientes
            mostrarNoticiasPorCategoria(noticiasPorCategoria);
            mostrarUltimasNoticias(noticiasUltimas);
        })
        .catch(error => {
            mostrarError("Error al cargar las noticias: " + error);
        });

    // Función para mostrar las noticias de cada categoría en las páginas correspondientes
    function mostrarNoticiasPorCategoria(noticiasPorCategoria) {
        for (let categoria in noticiasPorCategoria) {
            const noticias = noticiasPorCategoria[categoria];

            if (noticias.length > 0) {
                const categoriaElement = document.getElementById(`categoria-${categoria}`);
                const noticiasListaElement = categoriaElement ? categoriaElement.querySelector('.noticias-lista') : noticiasLista;

                if (!noticiasListaElement) {
                    console.error(`Error: No se encontró el elemento '.noticias-lista' para la categoría ${categoria}`);
                    continue;
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

                    noticiasListaElement.appendChild(noticiaElement);
                });
            }
        }
    }

    // Función para mostrar las últimas noticias en la sección "Últimas noticias"
    function mostrarUltimasNoticias(noticiasUltimas) {
        const noticiasUltimasElement = document.getElementById('noticias-ultimas');
        if (!noticiasUltimasElement) return;

        noticiasUltimas.forEach(noticia => {
            const noticiaElement = document.createElement('div');
            noticiaElement.classList.add('noticia-ultima');

            const imagenElement = document.createElement('img');
            imagenElement.src = noticia.imagen;
            imagenElement.alt = noticia.titulo;
            imagenElement.classList.add('noticia-ultima-imagen');

            const tituloElement = document.createElement('h3');
            tituloElement.textContent = noticia.titulo;
            tituloElement.classList.add('noticia-ultima-titulo');

            noticiaElement.appendChild(imagenElement);
            noticiaElement.appendChild(tituloElement);

            noticiasUltimasElement.appendChild(noticiaElement);
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
});
