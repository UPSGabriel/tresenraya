🎮 Tres en Raya — Desarrollado por Gabriel & Daniel

Proyecto de Progra Web en HTML5, CSS3 y JavaScript (ESM).
Juego clásico de tres en raya entre dos jugadores, con registro de partidas, duración, movimientos y ganador.

⚙️ Funcionalidades principales

Tablero 3×3 interactivo (mouse y teclado).

Alternancia automática de turnos (X / O).

Detección de victoria o empate.

Contador de movimientos y cronómetro (mm:ss).

Acciones: Revancha (mismos jugadores) y Nuevo juego.

Registro en localStorage: jugador1, jugador2, ganador, duración, movimientos y fecha.

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

💡 Decisiones técnicas

Se usa localStorage porque el volumen de datos es bajo y no requiere un sistema complejo como IndexedDB.

Las partidas se guardan como objetos dentro de un arreglo con clave ppw-tresenraya:partidas.

Cada registro incluye:

{
  jugador1, jugador2, ganador, duracion, movimientos, fecha
}


Se usa JavaScript modular (ESM) para separar la lógica del juego (game.js) y el almacenamiento (storage.js).

✅ Lista de comprobación de estándares

HTML5 semántico	✅: Estructura clara con etiquetas correctas (header, main, section, etc.)
Accesibilidad	✅: Soporte de teclado, aria-live, aria-disabled y foco visible
CSS3 responsivo	✅:	Adaptado para móvil y escritorio
Validación W3C	✅:	Sin errores críticos
Sin librerías externas✅:	Todo implementado con HTML, CSS y JS nativo

👨‍💻 Autores

Gabriel Córdova — estructura, diseño y base del juego.

Daniel Pacheco — lógica, historial y persistencia.

UNIVERISDAD POLITÉCNICA SALESIANA - SEDE CUENCA 
