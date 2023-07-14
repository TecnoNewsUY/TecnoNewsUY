window.addEventListener('DOMContentLoaded', () => {
    // Obtener el contenedor de las noticias
    const noticiasContainer = document.getElementById('noticias-container');

    // Cargar las noticias desde el archivo JSON
    fetch('https://raw.githubusercontent.com/TecnoNewsUY/TecnoNewsUY/master/todaslasnoticias/todaslasnoticias.json')
        .then(response => response.json())
        .then(data => {
            // Filtrar las noticias por categoría
            const categoriaSeleccionada = obtenerCategoriaSeleccionada();
            const noticiasFiltradas = data.filter(noticia => noticia.categoria === categoriaSeleccionada);

            // Verificar si hay noticias en la categoría seleccionada
            if (noticiasFiltradas.length > 0) {
                // Mostrar las últimas 5 noticias
                const ultimasNoticias = noticiasFiltradas.slice(-5);

                // Generar el HTML de las noticias
                const noticiasHTML = ultimasNoticias.map(noticia => generarHTMLNoticia(noticia)).join('');

                // Agregar el HTML al contenedor de noticias
                noticiasContainer.innerHTML = noticiasHTML;
            } else {
                mostrarError("No se encontraron noticias en la categoría seleccionada.");
            }
        })
        .catch(error => {
            mostrarError("Error al cargar las noticias: " + error);
        });

    // Función para generar el HTML de una noticia
    function generarHTMLNoticia(noticia) {
        const imagenHTML = noticia.imagen ? `<img src="${noticia.imagen}" alt="${noticia.titulo}">` : '';
        return `
            <div class="noticia">
                <div class="noticia-imagen">${imagenHTML}</div>
                <div class="noticia-contenido">
                    <h3 class="noticia-titulo">${noticia.titulo}</h3>
                    <p class="noticia-cuerpo">${noticia.contenido}</p>
                </div>
            </div>
        `;
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
});
