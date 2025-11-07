import { guardarPartida, obtenerHistorial, limpiarHistorial, exportarHistorial } from './storage.js';

const celdas = document.querySelectorAll('.celda');
const estado = document.getElementById('estado');
const turnoTxt = document.getElementById('turno');
const movTxt = document.getElementById('movimientos');
const tiempoTxt = document.getElementById('tiempo');
const form = document.getElementById('form-jugadores');
const btnNuevo = document.getElementById('btn-nuevo');

let jugador1 = '', jugador2 = '';
let turno = 'X';
let tablero = Array(9).fill('');
let jugando = false;
let movimientos = 0;
let inicio = null;
let timer = null;

form.addEventListener('submit', e => {
    e.preventDefault();
    jugador1 = document.getElementById('jugador1').value.trim();
    jugador2 = document.getElementById('jugador2').value.trim();
    const empieza = document.querySelector('input[name="empieza"]:checked').value;
    if (!jugador1 || !jugador2) {
        estado.textContent = 'Ingresa ambos nombres.';
        return;
    }
    turno = empieza;
    iniciarJuego();
});

btnNuevo.addEventListener('click', () => {
    location.reload();
});

function iniciarJuego() {
    jugando = true;
    tablero.fill('');
    movimientos = 0;
    inicio = Date.now();
    estado.textContent = `Turno de ${turno === 'X' ? jugador1 : jugador2}`;
    btnNuevo.disabled = false;
    actualizarInfo();
    celdas.forEach(c => {
        c.textContent = '';
        c.disabled = false;
        c.addEventListener('click', jugar);
    });
    timer = setInterval(actualizarTiempo, 1000);
}

function actualizarInfo() {
    turnoTxt.textContent = `Turno: ${turno}`;
    movTxt.textContent = `Movs: ${movimientos}`;
}

function actualizarTiempo() {
    const diff = Math.floor((Date.now() - inicio) / 1000);
    const mm = String(Math.floor(diff / 60)).padStart(2, '0');
    const ss = String(diff % 60).padStart(2, '0');
    tiempoTxt.textContent = `${mm}:${ss}`;
}

const combinacionesGanadoras = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function jugar(e) {
    if (!jugando) return;
    const i = e.target.dataset.index;
    if (tablero[i]) return;

    tablero[i] = turno;
    e.target.textContent = turno;
    e.target.disabled = true;
    movimientos++;
    actualizarInfo();

    if (verificarVictoria()) {
        finalizar(turno);
    } else if (movimientos === 9) {
        finalizar("Empate");
    } else {
        turno = turno === "X" ? "O" : "X";
        estado.textContent = `Turno de ${turno === "X" ? jugador1 : jugador2}`;
    }
}

function verificarVictoria() {
    return combinacionesGanadoras.some(([a, b, c]) => (
        tablero[a] && tablero[a] === tablero[b] && tablero[b] === tablero[c]
    ));
}

function finalizar(resultado) {
    jugando = false;
    clearInterval(timer);
    celdas.forEach(c => c.disabled = true);

    let ganador = "Empate";
    if (resultado !== "Empate") {
        ganador = resultado === "X" ? jugador1 : jugador2;
        estado.textContent = `¡Ganó ${ganador}!`;
    } else {
        estado.textContent = "¡Empate!";
    }

    const duracion = tiempoTxt.textContent;
    guardarPartida({
        jugador1,
        jugador2,
        ganador,
        duracion,
        movimientos,
        fecha: new Date().toISOString()
    });

    actualizarHistorial();
}

function actualizarHistorial() {
    const partidas = obtenerHistorial();
    const tbody = document.getElementById("tabla-historial");
    tbody.innerHTML = "";
    partidas.slice().reverse().forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${p.fecha.slice(0, 10)}</td>
      <td>${p.jugador1}</td>
      <td>${p.jugador2}</td>
      <td>${p.ganador}</td>
      <td>${p.duracion}</td>
      <td>${p.movimientos}</td>
    `;
        tbody.appendChild(tr);
    });
}

document.getElementById("btn-exportar").addEventListener("click", exportarHistorial);
document.getElementById("btn-limpiar").addEventListener("click", limpiarHistorial);

