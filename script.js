window.addEventListener('DOMContentLoaded', () => {
    // Registrar el Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('https://github.com/TecnoNewsUY/TecnoNewsUY/raw/master/service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado exitosamente:', registration);
            })
            .catch(error => {
                console.log('Error al registrar el Service Worker:', error);
            });
    }

    fetch('https://raw.githubusercontent.com/TecnoNewsUY/TecnoNewsUY/master/todaslasnoticias/todaslasnoticias.json')
        .then(response => response.json())
        .then(data => {
            const noticiasPorCategoria = agruparNoticiasPorCategoria(data);
            const ultimasNoticias = obtenerUltimasNoticias(noticiasPorCategoria, 3);
            mostrarNoticias(ultimasNoticias, noticiasLista);
            agregarEnlaces(ultimasNoticias, noticiasLista);

            const paginasNoticias = document.querySelectorAll('.noticias-lista');
            paginasNoticias.forEach(pagina => {
                const categoria = pagina.dataset.categoria;
                const noticiasCategoria = noticiasPorCategoria[categoria];
                const noticiasOrdenadas = ordenarNoticiasPorFechaDescendente(noticiasCategoria);
                mostrarNoticias(noticiasOrdenadas, pagina);
                agregarEnlaces(noticiasOrdenadas, pagina);
            });
        })
        .catch(error => console.log(error));

    function agruparNoticiasPorCategoria(noticias) {
        const noticiasPorCategoria = {};
        noticias.forEach(noticia => {
            const categoria = noticia.categoria;
            if (!noticiasPorCategoria.hasOwnProperty(categoria)) {
                noticiasPorCategoria[categoria] = [];
            }
            noticiasPorCategoria[categoria].push(noticia);
        });
        return noticiasPorCategoria;
    }

    function obtenerUltimasNoticias(noticiasPorCategoria, cantidad) {
        const ultimasNoticias = [];
        const noticiasVistas = new Set();

        for (const categoria in noticiasPorCategoria) {
            const noticiasCategoria = noticiasPorCategoria[categoria];
            for (let i = noticiasCategoria.length - 1; i >= 0 && ultimasNoticias.length < cantidad; i--) {
                const noticia = noticiasCategoria[i];
                if (!noticiasVistas.has(noticia.titulo)) {
                    ultimasNoticias.push(noticia);
                    noticiasVistas.add(noticia.titulo);
                }
            }
        }

        return ultimasNoticias;
    }

    function mostrarNoticias(noticias, contenedor) {
    contenedor.innerHTML = '';

    noticias.forEach(noticia => {
        const divNoticia = document.createElement('div');
        divNoticia.classList.add('noticia');

        const imagen = document.createElement('img');
        imagen.src = noticia.imagen;
        imagen.alt = noticia.titulo;

        const contenidoDiv = document.createElement('div');
        contenidoDiv.classList.add('noticia-contenido'); // Agregamos una clase para dar estilo al contenido

        const titulo = document.createElement('h3');
        titulo.classList.add('noticia-titulo');
        titulo.textContent = noticia.titulo;

        const contenido = document.createElement('p');
        contenido.textContent = noticia.contenido.slice(0, 50) + (noticia.contenido.length > 50 ? '...' : '');

        const enlace = document.createElement('span'); // Cambiamos <a> por <span>
        enlace.classList.add('boton-leer-mas'); // Agregamos la clase para dar estilo al botón
        enlace.textContent = 'Leer más';
        enlace.addEventListener('click', () => mostrarNoticiaCompleta(noticia)); // Mostrar noticia completa al hacer clic

        contenidoDiv.appendChild(titulo);
        contenidoDiv.appendChild(contenido);
        contenidoDiv.appendChild(enlace);

        divNoticia.appendChild(imagen);
        divNoticia.appendChild(contenidoDiv);

        contenedor.appendChild(divNoticia);
    });
}

function mostrarNoticiaCompleta(noticia) {
    alert(`Noticia completa: ${noticia.titulo}\n\n${noticia.contenido}`);
}

    function agregarEnlaces(noticias, contenedor) {
        const titulosNoticias = contenedor.querySelectorAll('.noticia-titulo');

        titulosNoticias.forEach(tituloNoticia => {
            const enlace = document.createElement('a');
            enlace.href = noticias.find(noticia => noticia.titulo === tituloNoticia.innerText).enlace_noticia;
            enlace.innerText = tituloNoticia.innerText;

            tituloNoticia.innerHTML = '';
            tituloNoticia.appendChild(enlace);
        });
    }

    function ordenarNoticiasPorFechaDescendente(noticias) {
        return noticias.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));
    }
});
