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
