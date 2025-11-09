import { guardarPartida, obtenerHistorial, limpiarHistorial, exportarHistorial, filtrarPartidas } from './storage.js';

const celdas = [...document.querySelectorAll('.celda')];
const estado = document.getElementById('estado');
const turnoTxt = document.getElementById('turno');
const movTxt = document.getElementById('movimientos');
const tiempoTxt = document.getElementById('tiempo');
const form = document.getElementById('form-jugadores');
const btnNuevo = document.getElementById('btn-nuevo');
const btnRevancha = document.getElementById('btn-revancha');

// Historial
const tbody = document.getElementById('tabla-historial');
const btnExportar = document.getElementById('btn-exportar');
const btnLimpiar = document.getElementById('btn-limpiar');
const formFiltros = document.getElementById('form-filtros');
const filtroGanador = document.getElementById('filtro-ganador');
const filtroDesde = document.getElementById('filtro-desde');
const filtroHasta = document.getElementById('filtro-hasta');

const GANADOR_LINEAS = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

let jugador1 = '', jugador2 = '';
let turno = 'X';
let quienEmpezo = 'X';
let tablero = Array(9).fill('');
let jugando = false;
let movimientos = 0;
let inicio = 0;
let timer = null;

// ==== Inicialización ligera ====
estado.textContent = 'Ingresa nombres, define quién empieza y presiona Comenzar.';
renderHistorial();

// ==== Formulario de inicio ====
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const j1 = document.getElementById('jugador1').value.trim();
    const j2 = document.getElementById('jugador2').value.trim();
    const empieza = document.querySelector('input[name="empieza"]:checked').value;
    if (!j1 || !j2) {
        estado.textContent = 'Ingresa ambos nombres.';
        return;
    }
    jugador1 = j1;
    jugador2 = j2;
    quienEmpezo = empieza;
    nuevaRonda();
});

// ==== Botones partida ====
btnNuevo.addEventListener('click', () => {
    stopTimer();
    // limpiar todo y pedir jugadores de nuevo
    tablero.fill('');
    movimientos = 0;
    turno = 'X';
    jugando = false;
    tiempoTxt.textContent = '00:00';
    movTxt.textContent = 'Movs: 0';
    turnoTxt.textContent = 'Turno: —';
    celdas.forEach(b => {
        b.textContent = '';
        b.setAttribute('disabled', 'true');    // antes de empezar sí las dejamos disabled
        b.removeAttribute('aria-disabled');
        b.classList.remove('ocupada');
    });
    btnNuevo.disabled = true;
    btnRevancha.disabled = true;
    form.reset();
    estado.textContent = 'Ingresa nombres y quién empieza, luego Comenzar.';
});

btnRevancha.addEventListener('click', () => {
    stopTimer();
    // misma dupla de jugadores; alterna quién empieza
    quienEmpezo = (quienEmpezo === 'X') ? 'O' : 'X';
    nuevaRonda();
});

// ==== Eventos tablero (click + teclado) ====
celdas.forEach((btn, i) => {
    btn.addEventListener('click', () => jugar(i));
    btn.addEventListener('keydown', (e) => {
        if (!jugando) return;
        const fila = Math.floor(i / 3), col = i % 3;
        let dest = i;
        switch (e.key) {
            case 'ArrowUp': dest = (fila > 0) ? i - 3 : i; break;
            case 'ArrowDown': dest = (fila < 2) ? i + 3 : i; break;
            case 'ArrowLeft': dest = (col > 0) ? i - 1 : i; break;
            case 'ArrowRight': dest = (col < 2) ? i + 1 : i; break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                // NO dependas de .disabled; usa tablero[i] para no sobreescribir
                if (!tablero[i]) jugar(i);
                return;
            default: return;
        }
        if (dest !== i) { e.preventDefault(); celdas[dest].focus(); }
    });
});

// ==== Historial: acciones y filtros ====
btnExportar?.addEventListener('click', () => {
    exportarHistorial(colectarFiltros());
});

btnLimpiar?.addEventListener('click', () => {
    if (confirm('¿Seguro que deseas eliminar todo el historial? Esta acción no se puede deshacer.')) {
        limpiarHistorial();
        renderHistorial();
        estado.textContent = 'Historial eliminado.';
    }
});

formFiltros?.addEventListener('submit', (e) => {
    e.preventDefault();
    renderHistorial();
});

document.getElementById('btn-limpiar-filtros')?.addEventListener('click', () => {
    filtroGanador.value = '';
    filtroDesde.value = '';
    filtroHasta.value = '';
    renderHistorial();
});

// ==== Funciones núcleo ====
function nuevaRonda() {
    tablero = Array(9).fill('');
    movimientos = 0;
    turno = quienEmpezo;
    jugando = true;
    inicio = Date.now();
    tiempoTxt.textContent = '00:00';
    movTxt.textContent = 'Movs: 0';
    turnoTxt.textContent = `Turno: ${turno}`;
    estado.textContent = `Empieza ${turno === 'X' ? jugador1 : jugador2} con ${turno}.`;

    celdas.forEach(b => {
        b.textContent = '';
        b.removeAttribute('disabled');         // ¡habilitadas para poder navegar!
        b.removeAttribute('aria-disabled');
        b.classList.remove('ocupada');
    });
    celdas[4].focus(); // centro
    btnNuevo.disabled = false;
    btnRevancha.disabled = true;
    startTimer();
}

function jugar(i) {
    if (!jugando) return;
    if (tablero[i]) return;        // celda ocupada: no sobreescribe
    tablero[i] = turno;
    celdas[i].textContent = turno;

    // En lugar de disabled, marcamos como ocupada pero ENFOCABLE
    celdas[i].setAttribute('aria-disabled', 'true');
    celdas[i].classList.add('ocupada');

    movimientos++;
    movTxt.textContent = `Movs: ${movimientos}`;

    const res = evaluar();
    if (res.tipo !== 'sigue') {
        finalizar(res);
        return;
    }
    turno = (turno === 'X') ? 'O' : 'X';
    turnoTxt.textContent = `Turno: ${turno}`;
    estado.textContent = `Turno de ${turno === 'X' ? jugador1 : jugador2}`;
}

function evaluar() {
    for (const [a,b,c] of GANADOR_LINEAS) {
        if (tablero[a] && tablero[a] === tablero[b] && tablero[b] === tablero[c]) {
            return { tipo: 'victoria', simbolo: tablero[a], linea: [a,b,c] };
        }
    }
    if (tablero.every(x => x)) return { tipo: 'empate' };
    return { tipo: 'sigue' };
}

function finalizar(info) {
    jugando = false;
    stopTimer();

    // No deshabilitamos: dejamos navegable pero sin permitir jugar (ver guardas arriba)
    celdas.forEach(b => b.setAttribute('aria-disabled','true'));

    let ganador = 'Empate';
    if (info.tipo === 'victoria') {
        ganador = (info.simbolo === 'X') ? 'J1' : 'J2';
        estado.textContent = `¡Victoria de ${ganador === 'J1' ? jugador1 : jugador2} (${info.simbolo})!`;
    } else {
        estado.textContent = '¡Empate!';
    }

    const registro = {
        jugador1,
        jugador2,
        ganador,                         // 'J1' | 'J2' | 'Empate'
        duracion: tiempoTxt.textContent, // 'mm:ss'
        movimientos,
        fecha: localISO()                // ISO 8601 local
    };
    guardarPartida(registro);
    renderHistorial();

    btnRevancha.disabled = false;
}

function startTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        const s = Math.floor((Date.now() - inicio) / 1000);
        const mm = String(Math.floor(s / 60)).padStart(2, '0');
        const ss = String(s % 60).padStart(2, '0');
        tiempoTxt.textContent = `${mm}:${ss}`;
    }, 500);
}

function stopTimer() {
    if (timer) { clearInterval(timer); timer = null; }
}

function renderHistorial() {
    if (!tbody) return;
    const filtros = colectarFiltros();
    const partidas = filtrarPartidas(filtros);
    tbody.innerHTML = '';
    partidas.slice().reverse().forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${p.fecha.slice(0,16).replace('T',' ')}</td>
      <td>${esc(p.jugador1)}</td>
      <td>${esc(p.jugador2)}</td>
      <td>${p.ganador}</td>
      <td>${p.duracion}</td>
      <td>${p.movimientos}</td>
    `;
        tbody.appendChild(tr);
    });
}

function colectarFiltros() {
    return {
        ganador: (filtroGanador?.value || ''),
        desde: (filtroDesde?.value || ''),
        hasta: (filtroHasta?.value || '')
    };
}

function localISO() {
    const d = new Date();
    const tzoff = d.getTimezoneOffset() * 60000;
    return new Date(d - tzoff).toISOString().slice(0,19); // 'YYYY-MM-DDTHH:mm:ss'
}

function esc(s) {
    return String(s)
        .replaceAll('&','&amp;').replaceAll('<','&lt;')
        .replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
}
