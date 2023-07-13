window.addEventListener('DOMContentLoaded', () => {
    // Obtener la sección del selector de noticias
    const noticiasSelector = document.getElementById('noticias-selector');

    // Obtener el contenedor del contenido de la noticia
    const noticiaContenido = document.getElementById('noticia-contenido');

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
                    // Mostrar las últimas 5 noticias en la sección
                    const ultimasNoticias = noticiasFiltradas.slice(-5).reverse();
                    mostrarNoticias(ultimasNoticias);
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

    // Cambiar el contenido de la noticia al seleccionar una opción del selector
    noticiasSelector.addEventListener('change', () => {
        const selectedIndex = noticiasSelector.value;
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
                        const selectedNoticia = noticiasFiltradas[selectedIndex];
                        mostrarNoticia(selectedNoticia);
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
    });

    // Función para mostrar las últimas noticias
    function mostrarNoticias(noticias) {
        noticiaContenido.innerHTML = '';
        noticias.forEach(noticia => {
            const noticiaItem = document.createElement('div');
            noticiaItem.classList.add('noticia');
            noticiaItem.innerHTML = `
                <a href="${generarEnlaceNoticia(noticia)}">
                    <div class="noticia-imagen">
                        <img src="${generarEnlaceImagen(noticia)}" alt="${noticia.titulo}">
                    </div>
                    <div class="noticia-info">
                        <h3>${noticia.titulo}</h3>
                        <p>${limitarTexto(noticia.contenido, 3)}</p>
                    </div>
                </a>
            `;
            noticiaContenido.appendChild(noticiaItem);
        });
    }

    // Función para mostrar un mensaje de error
    function mostrarError(mensaje) {
        noticiaContenido.innerHTML = `<p class="error">${mensaje}</p>`;
    }

    // Función para obtener la categoría seleccionada
    function obtenerCategoriaSeleccionada() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('categoria');
    }

    // Función para generar el enlace de la noticia
    function generarEnlaceNoticia(noticia) {
        const enlaceBase = `https://tecnonewsuy.github.io/TecnoNewsUY/page${noticia.categoria}.html`;
        const enlaceFormateado = enlaceBase + "?categoria=" + encodeURIComponent(noticia.enlace);
        return enlaceFormateado;
    }

    // Función para generar el enlace de la imagen de la noticia
    function generarEnlaceImagen(noticia) {
        // Aquí debes agregar la lógica para generar el enlace de la imagen
        // Puedes usar el enlace de la noticia o cualquier otro método que desees
        // Por ejemplo, puedes tener un directorio en el repositorio donde guardas las imágenes y generar el enlace en base a eso
        // return "https://ejemplo.com/imagen.jpg";
        return "";
    }

    // Función para limitar el texto a un número específico de líneas
    function limitarTexto(texto, lineas) {
        const lineasLimitadas = texto.split('\n').slice(0, lineas).join('\n');
        return lineasLimitadas;
    }
});

