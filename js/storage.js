const CLAVE = "ppw-tresenraya:partidas";

export function obtenerHistorial() {
    try {
        const raw = localStorage.getItem(CLAVE);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function guardarPartida(data) {
    const lista = obtenerHistorial();
    lista.push({ ...data });
    localStorage.setItem(CLAVE, JSON.stringify(lista));
}

export function limpiarHistorial() {
    localStorage.removeItem(CLAVE);
}

export function exportarHistorial(filtros = {}) {
    const datos = filtrarPartidas(filtros);
    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tresenraya_export_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

// Filtros: ganador ('J1'|'J2'|'Empate'|''), desde ('YYYY-MM-DD'), hasta ('YYYY-MM-DD')
export function filtrarPartidas({ ganador = '', desde = '', hasta = '' } = {}) {
    const lista = obtenerHistorial();
    return lista.filter(p => {
        let ok = true;
        if (ganador) ok = ok && p.ganador === ganador;
        if (desde) ok = ok && p.fecha >= `${desde}T00:00:00`;
        if (hasta) ok = ok && p.fecha <= `${hasta}T23:59:59`;
        return ok;
    });
}
