window.addEventListener('DOMContentLoaded', () => {
    const categoria = '1'; // Categoría uno

    fetch('https://raw.githubusercontent.com/TecnoNewsUY/TecnoNewsUY/master/todaslasnoticias/todaslasnoticias.json')
        .then(response => response.json())
        .then(data => {
            const noticiasCategoria = data.filter(noticia => noticia.categoria.includes(categoria));
            const noticiasMostradas = noticiasCategoria.slice(-3); // Mostrar las últimas 3 noticias

            const noticiasContainer = document.getElementById('noticias-container');
            noticiasContainer.innerHTML = ''; // Limpiar el contenedor de noticias

            noticiasMostradas.forEach(noticia => {
                const noticiaHTML = createNoticiaHTML(noticia.titulo, noticia.contenido);
                noticiasContainer.innerHTML += noticiaHTML;
            });
        })
        .catch(error => {
            console.error('Error al obtener las noticias:', error);
        });
});

function createNoticiaHTML(titulo, contenido) {
    const noticiaHTML = `
        <h3>${titulo}</h3>
        <p>${contenido}</p>
    `;
    return noticiaHTML;
}
