window.addEventListener('DOMContentLoaded', () => {
    // Obtener la sección de las últimas noticias
    const latestNewsContainer = document.getElementById('latest-news');

    // Cargar las noticias desde el archivo JSON
    fetch('https://raw.githubusercontent.com/TecnoNewsUY/TecnoNewsUY/master/todaslasnoticias/todaslasnoticias.json')
        .then(response => response.json())
        .then(data => {
            // Verificar si el archivo JSON contiene datos
            if (data && data.length > 0) {
                // Filtrar las noticias por categoría
                const categoriaSeleccionada = obtenerCategoriaSeleccionada();
                const noticiasFiltradas = data.filter(noticia => noticia.categoria === categoriaSeleccionada);

                // Verificar si hay noticias en la categoría seleccionada
                if (noticiasFiltradas.length > 0) {
                    // Ordenar las noticias por fecha (de más reciente a más antigua)
                    noticiasFiltradas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

                    // Limitar las noticias a las últimas 5
                    const ultimasNoticias = noticiasFiltradas.slice(0, 5);

                    // Mostrar las últimas noticias en el contenedor correspondiente
                    ultimasNoticias.forEach(noticia => {
                        const noticiaElement = crearElementoNoticia(noticia);
                        latestNewsContainer.appendChild(noticiaElement);
                    });
                } else {
                    mostrarError("No se encontraron noticias en la categoría seleccionada.");
                }
            } else {
                mostrarError("No se encontraron noticias.");
            }
        })
        .catch(error => {
            mostrarError("Error al cargar las noticias: " + error);
        });

    // Función para crear el elemento HTML de una noticia
    function crearElementoNoticia(noticia) {
        const noticiaElement = document.createElement('div');
        noticiaElement.className = 'noticia';

        // Verificar si la noticia tiene imagen
        if (noticia.imagen) {
            const imagenElement = document.createElement('img');
            imagenElement.src = noticia.imagen;
            imagenElement.alt = noticia.titulo;
            noticiaElement.appendChild(imagenElement);
        }

        const contenidoElement = document.createElement('div');
        contenidoElement.className = 'contenido';

        const tituloElement = document.createElement('h3');
        const enlaceElement = document.createElement('a');
        enlaceElement.href = `noticias/${noticia.enlace}`;
        enlaceElement.textContent = noticia.titulo;
        tituloElement.appendChild(enlaceElement);
        contenidoElement.appendChild(tituloElement);

        const cuerpoElement = document.createElement('p');
        cuerpoElement.textContent = noticia.contenido;
        contenidoElement.appendChild(cuerpoElement);

        noticiaElement.appendChild(contenidoElement);

        return noticiaElement;
    }

    // Función para mostrar un mensaje de error
    function mostrarError(mensaje) {
        const errorElement = document.createElement('p');
        errorElement.className = 'error';
        errorElement.textContent = mensaje;
        latestNewsContainer.appendChild(errorElement);
    }

    // Función para obtener la categoría seleccionada
    function obtenerCategoriaSeleccionada() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('categoria');
    }
});
