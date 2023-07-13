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
                    // Recorrer las noticias filtradas y agregar opciones al selector
                    noticiasFiltradas.forEach((noticia, index) => {
                        const option = document.createElement('option');
                        option.value = index;
                        option.textContent = noticia.titulo;
                        noticiasSelector.appendChild(option);
                    });

                    // Mostrar la primera noticia por defecto
                    mostrarNoticia(noticiasFiltradas[0]);
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

    // Función para mostrar el contenido de la noticia
    function mostrarNoticia(noticia) {
        const enlace = obtenerEnlaceNoticia(noticia.titulo);
        const titulo = `<a href="${enlace}">${noticia.titulo}</a>`;
        const imagen = noticia.imagen ? `<img src="${noticia.imagen}" alt="${noticia.titulo}">` : '';
        const contenido = `<div class="noticia">
                                <div class="imagen">${imagen}</div>
                                <div class="texto">
                                    <h3>${titulo}</h3>
                                    <p>${noticia.contenido}</p>
                                </div>
                           </div>`;
        noticiaContenido.innerHTML = contenido;
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

    // Función para obtener el enlace de la noticia
    function obtenerEnlaceNoticia(titulo) {
        const categoria = obtenerCategoriaSeleccionada();
        const tituloFormateado = titulo.toLowerCase().replace(/\s+/g, '_').replace(/[^\w-]+/g, '');
        return `page${categoria}.html?categoria=${categoria}/${tituloFormateado}`;
    }
});
