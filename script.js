window.addEventListener('DOMContentLoaded', () => {
    const categoria = obtenerCategoria();
    const noticiasContainer = document.getElementById('noticias-container');

    // Obtener noticias de la categoría correspondiente
    obtenerNoticias(categoria)
        .then(noticias => {
            // Mostrar las últimas 3 noticias
            const ultimasNoticias = noticias.slice(-3);
            ultimasNoticias.forEach(noticia => {
                const noticiaHTML = generarHTMLNoticia(noticia.titulo, noticia.contenido);
                noticiasContainer.appendChild(noticiaHTML);
            });
        })
        .catch(error => {
            console.error('Error al obtener las noticias:', error);
        });
});

// Función para obtener la categoría de la página actual
function obtenerCategoria() {
    const url = window.location.href;
    if (url.includes('page1.html')) {
        return 'Noticias';
    } else if (url.includes('page2.html')) {
        return 'Ultima Hora';
    } else if (url.includes('page3.html')) {
        return 'Ofertas';
    }
}

// Función para obtener las noticias de una categoría
function obtenerNoticias(categoria) {
    return fetch('https://raw.githubusercontent.com/TecnoNewsUY/TecnoNewsUY/master/todaslasnoticias/todaslasnoticias.json')
        .then(response => response.json())
        .then(data => {
            const noticias = data.filter(noticia => noticia.categoria.includes(categoria));
            return noticias;
        });
}

// Función para generar el HTML de una noticia
function generarHTMLNoticia(titulo, contenido) {
    const noticiaHTML = document.createElement('div');
    noticiaHTML.classList.add('noticia');
    noticiaHTML.innerHTML = `
        <h3>${titulo}</h3>
        <p>${contenido}</p>
    `;
    return noticiaHTML;
}
