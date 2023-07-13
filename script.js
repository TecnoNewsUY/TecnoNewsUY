window.addEventListener('DOMContentLoaded', () => {
    // Obtener la sección del selector de noticias
    const noticiasSelector = document.getElementById('noticias-selector');

    // Obtener el contenedor del contenido de la noticia
    const noticiaContenido = document.getElementById('noticia-contenido');

    // Obtener la categoría seleccionada de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaSeleccionada = urlParams.get('categoria');

    // Cargar las noticias desde el archivo JSON
    fetch('https://raw.githubusercontent.com/TecnoNewsUY/TecnoNewsUY/master/todaslasnoticias/todaslasnoticias.json')
        .then(response => response.json())
        .then(data => {
            // Filtrar las noticias por categoría seleccionada
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
                // Filtrar las noticias por categoría seleccionada
                const noticiasFiltradas = data.filter(noticia => noticia.categoria === categoriaSeleccionada);

                // Verificar si hay noticias en la categoría seleccionada
                if (noticiasFiltradas.length > 0) {
                    const selectedNoticia = noticiasFiltradas[selectedIndex];
                    mostrarNoticia(selectedNoticia);
                } else {
                    mostrarError("No se encontraron noticias en la categoría seleccionada.");
                }
            })
            .catch(error => {
                mostrarError("Error al cargar las noticias: " + error);
            });
    });

    // Función para mostrar el contenido de la noticia
    function mostrarNoticia(noticia) {
        noticiaContenido.innerHTML = `<h3>${noticia.titulo}</h3><p>${noticia.contenido}</p>`;
    }

    // Función para mostrar un mensaje de error
    function mostrarError(mensaje) {
        noticiaContenido.innerHTML = `<p class="error">${mensaje}</p>`;
    }
});
