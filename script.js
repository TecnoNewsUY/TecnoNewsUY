window.addEventListener('DOMContentLoaded', () => {
    const noticiasLista = document.getElementById('noticias-lista');

    // Obtener las noticias desde el archivo JSON
    fetch('https://raw.githubusercontent.com/TecnoNewsUY/TecnoNewsUY/master/todaslasnoticias/todaslasnoticias.json')
        .then(response => response.json())
        .then(data => {
            // Filtrar las noticias por categoría y obtener las últimas 5 noticias
            const categoriaSeleccionada = obtenerCategoriaSeleccionada();
            const noticiasFiltradas = data.filter(noticia => noticia.categoria === categoriaSeleccionada).slice(0, 5);

            // Verificar si hay noticias en la categoría seleccionada
            if (noticiasFiltradas.length > 0) {
                // Mostrar las últimas noticias en la lista
                mostrarNoticias(noticiasFiltradas);
            } else {
                mostrarError("No se encontraron noticias en la categoría seleccionada.");
            }
        })
        .catch(error => {
            mostrarError("Error al cargar las noticias: " + error);
        });

    // Función para mostrar las noticias en la lista
    function mostrarNoticias(noticias) {
        noticiasLista.innerHTML = '';

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

            noticiasLista.appendChild(noticiaElement);
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

    // Función para obtener la categoría seleccionada de la URL
    function obtenerCategoriaSeleccionada() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('categoria');
    }
});
