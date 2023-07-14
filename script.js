window.addEventListener('DOMContentLoaded', () => {
    const noticiasLista = document.getElementById('noticias-lista');

    // Obtener las noticias desde el archivo JSON
    fetch('https://raw.githubusercontent.com/TecnoNewsUY/TecnoNewsUY/master/todaslasnoticias/todaslasnoticias.json')
        .then(response => response.json())
        .then(data => {
            // Obtener las últimas noticias sin repetir por categoría
            const noticiasUltimas = obtenerUltimasNoticias(data);

            // Verificar si hay noticias disponibles
            if (noticiasUltimas.length > 0) {
                // Mostrar las últimas noticias en la lista
                mostrarNoticias(noticiasUltimas);
            } else {
                mostrarError("No se encontraron noticias.");
            }
        })
        .catch(error => {
            mostrarError("Error al cargar las noticias: " + error);
        });

    // Función para obtener las últimas noticias sin repetir por categoría
    function obtenerUltimasNoticias(noticias) {
        const ultimasNoticias = new Map();
        noticias.forEach(noticia => {
            const categoria = noticia.categoria;
            if (!ultimasNoticias.has(categoria)) {
                ultimasNoticias.set(categoria, noticia);
            }
        });
        return Array.from(ultimasNoticias.values()).slice(0, 5);
    }

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
});
