window.addEventListener('DOMContentLoaded', () => {
    const categoria = '1'; // Categoría uno

    const script = document.createElement('script');
    script.src = `https://raw.githubusercontent.com/TecnoNewsUY/TecnoNewsUY/master/todaslasnoticias/todaslasnoticias.json?callback=procesarNoticias`;
    document.body.appendChild(script);
});

function procesarNoticias(data) {
    const noticiasCategoria = data.filter(noticia => noticia.categoria.includes(categoria));
    const noticiasMostradas = noticiasCategoria.slice(-3); // Mostrar las últimas 3 noticias

    const noticiasContainer = document.getElementById('noticias-container');
    noticiasContainer.innerHTML = ''; // Limpiar el contenedor de noticias

    noticiasMostradas.forEach(noticia => {
        const noticiaHTML = createNoticiaHTML(noticia.titulo, noticia.contenido);
        noticiasContainer.innerHTML += noticiaHTML;
    });
}

function createNoticiaHTML(titulo, contenido) {
    const noticiaHTML = `
        <h3>${titulo}</h3>
        <p>${contenido}</p>
    `;
    return noticiaHTML;
}
