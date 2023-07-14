window.addEventListener('DOMContentLoaded', () => {
    const noticiasLista = document.getElementById('noticias-lista');

    if (!noticiasLista) {
        console.error("Error: No se encontró el elemento con el ID 'noticias-lista'");
        return;
    }

    // Obtener las noticias desde el archivo JSON
    fetch('https://raw.githubusercontent.com/TecnoNewsUY/TecnoNewsUY/master/todaslasnoticias/todaslasnoticias.json')
        .then(response => response.json())
        .then(data => {
            // Filtrar las últimas 3 noticias sin repeticiones
            const noticiasUltimas = filtrarUltimasNoticias(data);

            // Mostrar las últimas noticias en la sección correspondiente
            mostrarNoticias(noticiasUltimas);
        })
        .catch(error => {
            mostrarError("Error al cargar las noticias: " + error);
        });

    // Función para filtrar las últimas 3 noticias sin repeticiones
    function filtrarUltimasNoticias(data) {
        const noticiasFiltradas = [];
        const noticiasVistas = [];

        for (let i = data.length - 1; i >= 0 && noticiasFiltradas.length < 3; i--) {
            const noticia = data[i];

            if (!noticiasVistas.includes(noticia.titulo)) {
                noticiasFiltradas.push(noticia);
                noticiasVistas.push(noticia.titulo);
            }
        }

        return noticiasFiltradas;
    }

    // Función para mostrar las noticias en la sección correspondiente
    function mostrarNoticias(noticias) {
        noticias.forEach(noticia => {
            const noticiaElement = document.createElement('div');
            noticiaElement.classList.add('noticia');

            const imagenElement = document.createElement('img');
            imagenElement.src = noticia.imagen || 'https://via.placeholder.com/150/FF0000/FFFFFF?text=No+Image';
            imagenElement.alt = noticia.titulo;
            imagenElement.classList.add('noticia-imagen');

            const contenidoElement = document.createElement('div');
            contenidoElement.classList.add('noticia-contenido');

            const tituloElement = document.createElement('h3');
            tituloElement.textContent = noticia.titulo;
            tituloElement.classList.add('noticia-titulo');

            const cuerpoElement = document.createElement('p');
            cuerpoElement.textContent = noticia.contenido.substring(0, 100) + '...';

            contenidoElement.appendChild(tituloElement);
            contenidoElement.appendChild(cuerpoElement);

            noticiaElement.appendChild(imagenElement);
            noticiaElement.appendChild(contenidoElement);

            // Agregar evento de click para mostrar la noticia completa
            noticiaElement.addEventListener('click', () => {
                mostrarNoticiaCompleta(noticia);
            });

            noticiasLista.appendChild(noticiaElement);
        });
    }

    // Función para mostrar la noticia completa
    function mostrarNoticiaCompleta(noticia) {
        const noticiaCompleta = document.createElement('div');
        noticiaCompleta.classList.add('noticia-completa');

        const tituloElement = document.createElement('h2');
        tituloElement.textContent = noticia.titulo;

        const contenidoElement = document.createElement('p');
        contenidoElement.textContent = noticia.contenido;

        noticiaCompleta.appendChild(tituloElement);
        noticiaCompleta.appendChild(contenidoElement);

        noticiasLista.innerHTML = '';
        noticiasLista.appendChild(noticiaCompleta);
    }

    // Función para mostrar un mensaje de error
    function mostrarError(mensaje) {
        const errorElement = document.createElement('p');
        errorElement.classList.add('error');
        errorElement.textContent = mensaje;

        noticiasLista.innerHTML = '';
        noticiasLista.appendChild(errorElement);
    }
});
