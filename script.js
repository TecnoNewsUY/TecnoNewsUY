window.addEventListener('DOMContentLoaded', () => {
    // Obtener la sección del selector de noticias
    const noticiasSelector = document.getElementById('noticias-selector');

    // Obtener el contenedor del contenido de la noticia
    const noticiaContenido = document.getElementById('noticia-contenido');

    // Cargar las noticias desde el archivo JSON
    fetch('todaslasnoticias/todaslasnoticias.json')
        .then(response => response.json())
        .then(data => {
            // Recorrer las noticias y agregar opciones al selector
            data.forEach((noticia, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = noticia.titulo;
                noticiasSelector.appendChild(option);
            });

            // Mostrar la primera noticia por defecto
            mostrarNoticia(data[0]);
        })
        .catch(error => {
            console.error('Error al cargar las noticias:', error);
        });

    // Cambiar el contenido de la noticia al seleccionar una opción del selector
    noticiasSelector.addEventListener('change', () => {
        const selectedIndex = noticiasSelector.value;
        fetch('todaslasnoticias/todaslasnoticias.json')
            .then(response => response.json())
            .then(data => {
                const selectedNoticia = data[selectedIndex];
                mostrarNoticia(selectedNoticia);
            })
            .catch(error => {
                console.error('Error al cargar las noticias:', error);
            });
    });

    // Función para mostrar el contenido de la noticia
    function mostrarNoticia(noticia) {
        noticiaContenido.innerHTML = `<h3>${noticia.titulo}</h3><p>${noticia.contenido}</p>`;
    }
});
