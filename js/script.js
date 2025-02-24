const buscador = document.getElementById('buscador');
const botonBuscar = document.getElementById('boton-buscar');
const resultados = document.getElementById('resultados');

botonBuscar.addEventListener('click', () => {
    const query = buscador.value;
    buscarLibros(query);
});

async function buscarLibros(query) {
    try {
        const response = await fetch(`https://biblioteca-jbe7atgme-s4mma3ls-projects.vercel.app/buscar?query=${query}`);
        const libros = await response.json();
        mostrarResultados(libros);
    } catch (error) {
        console.error('Error al buscar libros:', error);
        resultados.innerHTML = '<p>Error al buscar libros. Por favor, inténtalo de nuevo más tarde.</p>';
    }
}

function mostrarResultados(libros) {
    resultados.innerHTML = '';
    libros.forEach(libro => {
        const libroElemento = document.createElement('div');
        libroElemento.classList.add('resultado-libro');
        libroElemento.innerHTML = `
            <h2>${libro.titulo}</h2>
            <p>Autor: ${libro.autor}</p>
            <p>${libro.descripcion}</p>
            <a href="${libro.url_archivo}" target="_blank">Leer libro</a>
        `;
        resultados.appendChild(libroElemento);
    });
}