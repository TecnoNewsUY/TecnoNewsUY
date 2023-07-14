window.addEventListener('DOMContentLoaded', () => {
    // Obtener la sección de noticias
    const noticiasContainer = document.getElementById('noticias-container');

    // Cargar las noticias desde el archivo JSON
    fetch('https://raw.githubusercontent.com/TecnoNewsUY/TecnoNewsUY/master/todaslasnoticias/todaslasnoticias.json')
        .then(response => response.json())
        .then(data => {
            // Verificar si el archivo JSON contiene datos
            if (data && data.length > 0) {
                // Obtener las últimas 5 noticias
                const ultimasNoticias = data.slice(-5);

                // Generar el contenido HTML para las noticias
                const noticiasHTML = ultimasNoticias.map(noticia => {
                    return `
                        <div class="noticia" onclick="mostrarNoticia('${noticia.titulo}')">
                            ${noticia.imagen ? `<img src="${noticia.imagen}" alt="${noticia.titulo}" class="noticia-img">` : ''}
                            <h3 class="noticia-titulo">${noticia.titulo}</h3>
                            <p class="noticia-cuerpo">${noticia.contenido}</p>
                        </div>
                    `;
                }).join('');

                // Agregar el contenido HTML al contenedor de noticias
                noticiasContainer.innerHTML = noticiasHTML;
            } else {
                mostrarError("No se encontraron noticias.");
            }
        })
        .catch(error => {
            mostrarError("Error al cargar las noticias: " + error);
        });
});

// Función para mostrar la noticia completa
function mostrarNoticia(titulo) {
    // Redirigir a la página de la noticia completa
    window.location.href = `noticias/${titulo.toLowerCase().replace(/ /g, '-')}.html`;
}

// Función para mostrar un mensaje de error
function mostrarError(mensaje) {
    noticiasContainer.innerHTML = `<p class="error">${mensaje}</p>`;
}
