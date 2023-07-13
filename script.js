window.addEventListener('DOMContentLoaded', () => {
    // Obtener el contenedor del contenido de las noticias
    const noticiasContainer = document.getElementById('latest-news');

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
                    // Mostrar las últimas noticias en el contenedor
                    mostrarNoticias(noticiasFiltradas);
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

    // Función para mostrar las noticias en el contenedor
    function mostrarNoticias(noticias) {
        noticiasContainer.innerHTML = '';
        noticias.forEach(noticia => {
            const noticiaElement = document.createElement('div');
            noticiaElement.classList.add('noticia');

            const noticiaLink = document.createElement('a');
            noticiaLink.href = generarEnlaceNoticia(noticia);

            const noticiaImagen = document.createElement('div');
            noticiaImagen.classList.add('noticia-imagen');

            const imagen = document.createElement('img');
            imagen.src = generarEnlaceImagen(noticia);
            imagen.alt = noticia.titulo;

            noticiaImagen.appendChild(imagen);
            noticiaLink.appendChild(noticiaImagen);
            noticiaElement.appendChild(noticiaLink);

            const noticiaContenido = document.createElement('div');
            noticiaContenido.classList.add('noticia-contenido');

            const titulo = document.createElement('h3');
            const tituloLink = document.createElement('a');
            tituloLink.href = generarEnlaceNoticia(noticia);
            tituloLink.textContent = noticia.titulo;
            titulo.appendChild(tituloLink);
            noticiaContenido.appendChild(titulo);

            const contenido = document.createElement('p');
            contenido.textContent = limitarTexto(noticia.contenido, 3);
            noticiaContenido.appendChild(contenido);

            noticiaElement.appendChild(noticiaContenido);

            noticiasContainer.appendChild(noticiaElement);
        });
    }

    // Función para mostrar un mensaje de error
    function mostrarError(mensaje) {
        noticiasContainer.innerHTML = `<p class="error">${mensaje}</p>`;
    }

    // Función para obtener la categoría seleccionada
    function obtenerCategoriaSeleccionada() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('categoria');
    }

    // Función para generar el enlace de la noticia
    function generarEnlaceNoticia(noticia) {
        const categoria = noticia.categoria;
        const enlaceBase = `https://tecnonewsuy.github.io/TecnoNewsUY/page${categoria}.html`;
        const enlaceFormateado = enlaceBase + "?categoria=" + encodeURIComponent(noticia.enlace);
        return enlaceFormateado;
    }

    // Función para generar el enlace de la imagen de la noticia
    function generarEnlaceImagen(noticia) {
        // Aquí puedes agregar la lógica para generar el enlace de la imagen
        // Puedes usar el enlace de la noticia o cualquier otro método que desees
        // Por ejemplo, puedes tener un directorio en el repositorio donde guardas las imágenes y generar el enlace en base a eso
        return "";
    }

    // Función para limitar el texto a un número específico de líneas
    function limitarTexto(texto, lineas) {
        const lineasLimitadas = texto.split('\n').slice(0, lineas).join('\n');
        return lineasLimitadas;
    }
});
