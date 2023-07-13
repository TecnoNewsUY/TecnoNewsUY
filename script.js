window.addEventListener('DOMContentLoaded', () => {
    // Obtener la sección del selector de noticias
    const noticiasSelector = document.getElementById('noticias-selector');

    // Obtener el contenedor del contenido de la noticia
    const noticiaContenido = document.getElementById('noticia-contenido');

    // Cargar las noticias desde el archivo JSON
    fetch('todaslasnoticias/todaslasnoticias.json')
        .then(response => response.json())
        .then(data => {
            // Verificar si el archivo JSON contiene datos
            if (data && data.length > 0) {
                // Recorrer las noticias y agregar opciones al selector
                data.forEach((noticia, index) => {
                    const option = document.createElement('option');
                    option.value = index;
                    option.textContent = noticia.titulo;
                    noticiasSelector.appendChild(option);
                });

                // Mostrar la primera noticia por defecto
                mostrarNoticia(data[0]);
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
        fetch('todaslasnoticias/todaslasnoticias.json')
            .then(response => response.json())
            .then(data => {
                // Verificar si el archivo JSON contiene datos
                if (data && data.length > 0) {
                    const selectedNoticia = data[selectedIndex];
                    mostrarNoticia(selectedNoticia);
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
        noticiaContenido.innerHTML = `<h3>${noticia.titulo}</h3><p>${noticia.contenido}</p>`;
    }

    // Función para mostrar un mensaje de error
    function mostrarError(mensaje) {
        noticiaContenido.innerHTML = `<p class="error">${mensaje}</p>`;
    }
});

