window.addEventListener('DOMContentLoaded', () => {
    const noticiasLista = document.getElementById('noticias-lista');

    if (!noticiasLista) {
        console.error("Error: No se encontró el elemento con el ID 'noticias-lista'");
        return;
    }

    fetch('https://raw.githubusercontent.com/TecnoNewsUY/TecnoNewsUY/master/todaslasnoticias/todaslasnoticias.json')
        .then(response => response.json())
        .then(data => {
            const noticiasPorCategoria = {};

            data.forEach(noticia => {
                const categoria = noticia.categoria;
                if (!noticiasPorCategoria.hasOwnProperty(categoria)) {
                    noticiasPorCategoria[categoria] = [];
                }
                noticiasPorCategoria[categoria].push(noticia);
            });

            const noticias = obtenerUltimasNoticias(noticiasPorCategoria, 3);
            mostrarNoticias(noticias, noticiasLista);
        })
        .catch(error => {
            mostrarError("Error al cargar las noticias: " + error);
        });

    function obtenerUltimasNoticias(noticiasPorCategoria, cantidad) {
        const noticiasUnicas = [];
        const noticiasVistas = new Set();
        let contador = 0;

        for (const categoria in noticiasPorCategoria) {
            const noticiasCategoria = noticiasPorCategoria[categoria];
            for (let i = noticiasCategoria.length - 1; i >= 0; i--) {
                const noticia = noticiasCategoria[i];
                if (!noticiasVistas.has(noticia.titulo)) {
                    noticiasUnicas.push(noticia);
                    noticiasVistas.add(noticia.titulo);
                    contador++;
                }

                if (contador === cantidad) {
                    break;
                }
            }

            if (contador === cantidad) {
                break;
            }
        }

        return noticiasUnicas;
    }

    function mostrarNoticias(noticias, contenedor) {
        contenedor.innerHTML = '';

        noticias.forEach(noticia => {
            const divNoticia = document.createElement('div');
            divNoticia.classList.add('noticia');

            const titulo = document.createElement('h3');
            const enlace = document.createElement('a'); // Nuevo elemento
            enlace.href = noticia.enlace_noticia; // Nuevo código
            enlace.textContent = noticia.titulo; // Nuevo código
            titulo.appendChild(enlace); // Nuevo código

            const contenido = document.createElement('p');
            contenido.textContent = noticia.contenido;

            const imagen = document.createElement('img');
            imagen.src = noticia.imagen;
            imagen.alt = noticia.titulo;

            divNoticia.appendChild(titulo);
            divNoticia.appendChild(contenido);
            divNoticia.appendChild(imagen);

            contenedor.appendChild(divNoticia);
        });
    }

    function mostrarError(mensaje) {
        const errorElement = document.createElement('p');
        errorElement.classList.add('error');
        errorElement.textContent = mensaje;

        noticiasLista.innerHTML = '';
        noticiasLista.appendChild(errorElement);
    }
});
