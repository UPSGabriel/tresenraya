
const CLAVE = "ppw-tresenraya:partidas";

export function guardarPartida(data) {
    const partidas = obtenerHistorial();
    partidas.push(data);
    localStorage.setItem(CLAVE, JSON.stringify(partidas));
}

export function obtenerHistorial() {
    const raw = localStorage.getItem(CLAVE);
    return raw ? JSON.parse(raw) : [];
}

export function limpiarHistorial() {
    localStorage.removeItem(CLAVE);
    document.getElementById("tabla-historial").innerHTML = "";
}

export function exportarHistorial() {
    const partidas = obtenerHistorial();
    const blob = new Blob([JSON.stringify(partidas, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "historial_tresenraya.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
