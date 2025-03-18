let amigos = [];

function agregarAmigo() {
    const input = document.getElementById('nombre');
    const nombre = input.value.trim();
    
    if (nombre === '') {
        alert('¡Ingresa un nombre válido!');
        return;
    }
    
    if (amigos.includes(nombre)) {
        alert('¡Este nombre ya está en la lista!');
        return;
    }
    
    amigos.push(nombre);
    input.value = '';
    actualizarLista();
}

function actualizarLista() {
    const lista = document.getElementById('lista-amigos');
    lista.innerHTML = amigos.map(nombre => `
        <li>
            ${nombre}
            <button onclick="eliminarAmigo('${nombre}')">×</button>
        </li>
    `).join('');
}

function eliminarAmigo(nombre) {
    amigos = amigos.filter(a => a !== nombre);
    actualizarLista();
}

function realizarSorteo() {
    if (amigos.length < 2) {
        alert('¡Necesitas al menos 2 participantes!');
        return;
    }

    let shuffled = [...amigos];
    do {
        shuffled = shuffle([...amigos]);
    } while (shuffled.some((nombre, index) => nombre === amigos[index]));

    mostrarResultados(shuffled);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function mostrarResultados(pares) {
    const resultados = document.getElementById('resultados');
    resultados.innerHTML = '<h2>🔒 Parejas Secretas:</h2>' + 
        amigos.map((nombre, index) => `
            <div class="par">
                <strong>${nombre}</strong> → ${pares[index]}
            </div>
        `).join('');
}
