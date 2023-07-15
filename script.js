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

                // Muestra solo 5 noticias por página
                const noticiasPorPagina = 5;
                const totalPaginas = Math.ceil(noticiasOrdenadas.length / noticiasPorPagina);

                for (let i = 0; i < totalPaginas; i++) {
                    const inicio = i * noticiasPorPagina;
                    const fin = inicio + noticiasPorPagina;
                    const noticiasPagina = noticiasOrdenadas.slice(inicio, fin);

                    // Crea un nuevo contenedor para las noticias de esta página
                    const contenedorPagina = document.createElement('div');

                    // Muestra las noticias en el contenedor de la página
                    mostrarNoticias(noticiasPagina, contenedorPagina);

                    // Oculta el contenedor si no es la primera página
                    if (i > 0) {
                        contenedorPagina.style.display = 'none';
                    }

                    // Agrega el contenedor de la página a la sección correspondiente
                    pagina.appendChild(contenedorPagina);

                    // Agrega el selector de páginas dinámico
                    const paginaBoton = document.getElementById(`pagina-boton-${categoria}`);
                    const boton = document.createElement('button');
                    boton.classList.add('boton', 'pagina');
                    boton.textContent = i + 1;
                    boton.addEventListener('click', () => {
                        // Oculta todas las páginas y muestra la seleccionada
                        const paginas = pagina.querySelectorAll('.noticias-lista > div');
                        paginas.forEach(p => (p.style.display = 'none'));
                        contenedorPagina.style.display = 'block';
                    });
                    paginaBoton.appendChild(boton);
                }
            });
        })
        .catch(error => console.log(error));
});

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

        // Ordenar las noticias por fecha descendente antes de devolverlas
        return ultimasNoticias.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));
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

    return noticias.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));
}

});
