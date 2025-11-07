🎮 Tres en Raya — Gabriel & Daniel

Proyecto académico en HTML5, CSS3 y JavaScript (ESM).
Juego clásico de tres en raya entre dos jugadores, con registro de partidas, duración, movimientos y ganador.

⚙️ Funcionalidades principales

Tablero 3×3 interactivo (mouse y teclado).

Turnos automáticos (X / O) y bloqueo de celdas ocupadas.

Detección de victoria o empate.

Contador de movimientos y cronómetro (mm:ss).

Acciones: Revancha (mismos jugadores) y Nuevo juego.

Registro en localStorage: jugador1, jugador2, ganador, duración, movimientos, fecha.

Historial con filtros por ganador y fecha.

Exportar a JSON y limpiar historial con confirmación.

🧱 Estructura del proyecto
/tresenraya/
│
├── index.html
├── /css/
│   └── styles.css
├── /js/
│   ├── game.js
│   └── storage.js
├── /assets/
│   └── export_ejemplo.json
└── README.md

🚀 Ejecución local

Abre el proyecto en WebStorm o VSCode.

Inicia un servidor local:

npx serve .


o

python -m http.server 8080


Abre en el navegador:
👉 http://localhost:8080

👨‍💻 Autores

Gabriel Córdova — estructura, diseño y base del juego.

Daniel Pacheco — lógica, historial y persistencia.

✅ Cumple con

HTML5 semántico

CSS3 responsivo

Accesibilidad básica (aria, foco, teclado)

Validación W3C sin errores críticos

Sin librerías externas
