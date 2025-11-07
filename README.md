🧩 README.md — Tres en Raya (Gabriel & Daniel)
📘 Descripción del proyecto

Juego de Tres en Raya (Tic-Tac-Toe) desarrollado con HTML5, CSS3 y JavaScript (ES Modules) como práctica de los estándares vistos en clase.
Permite partidas interactivas entre dos jugadores, registro automático de resultados, cronómetro, contador de movimientos y persistencia local de las partidas con historial exportable y filtrable.

⚙️ Funcionalidades implementadas
🎮 A. Juego

Tablero 3×3 interactivo con clic o navegación por teclado (flechas + Enter/Espacio).

Alternancia automática de turnos (X / O).

Bloqueo de celdas ocupadas.

Detección confiable de victoria o empate.

Contador de movimientos por partida.

Cronómetro con duración mm:ss.

Acciones:

Revancha: mismos jugadores, cambia quién empieza.

Nuevo juego: reinicia con nuevos jugadores.

💾 B. Registro y persistencia

Formulario inicial con nombres de jugador 1 (X) y jugador 2 (O), y selección de quién empieza.

Al finalizar, se guarda un registro con:

jugador1, jugador2, ganador, duracion, movimientos, fecha (ISO local)


Persistencia mediante localStorage con namespacing:
ppw-tresenraya:partidas

📜 C. Historial

Tabla con las partidas jugadas (Fecha, J1, J2, Ganador, Duración, Movs).

Filtros: por ganador (J1/J2/Empate) y por rango de fechas.

Exportar a JSON con un clic.

Limpiar historial con confirmación.

🧱 D. Estándares y accesibilidad

Estructura semántica HTML5 (header, main, section, footer, fieldset, legend, aria-live, etc.).

Atributos lang="es", meta viewport y etiquetas asociadas a cada campo del formulario.

Foco visible y soporte completo de teclado.

Diseño responsivo para escritorio y móvil con CSS3.

Estados :hover, :focus-visible y :disabled implementados.

JavaScript modular con type="module".

Sin dependencias externas (sin frameworks).

Sin errores en consola ni validaciones críticas en HTML/CSS.

🧩 Estructura del proyecto
/tresenraya/
│
├── index.html
├── /css/
│   └── styles.css
├── /js/
│   ├── game.js        # Lógica del juego, UI y eventos
│   └── storage.js     # Persistencia y filtros de historial
├── /assets/           # (opcional) iconos o imágenes
└── README.md

🚀 Ejecución local

Abre la carpeta del proyecto en WebStorm, VSCode o similar.

Como se usan módulos ES, debes abrirlo en un servidor local:

# Ejemplo con Python
python -m http.server 8080
# o con Node.js
npx serve .


Abre en el navegador:
👉 http://localhost:8080

🧠 Decisiones técnicas

localStorage se eligió sobre IndexedDB por su simplicidad y porque los datos son livianos.

Los registros se guardan como un arreglo de objetos en formato JSON.

La fecha se guarda en formato ISO 8601 local, ejemplo:

2025-11-07T16:25:00


Se usa namespacing "ppw-tresenraya:partidas" para evitar conflictos con otros proyectos.

✅ Lista de comprobación de estándares
Criterio	Cumple	Observaciones
HTML5 semántico	✅	Estructura clara con etiquetas correctas
Accesibilidad (aria, foco, teclado)	✅	Incluye aria-live, roles y navegación por teclado
Responsividad	✅	Adaptado a móvil y escritorio
Validación W3C (HTML y CSS)	✅	Sin errores críticos
JavaScript modular	✅	ESM type="module"
Persistencia local	✅	localStorage namespaced
Exportación JSON	✅	Descarga con Blob
Limpieza del historial	✅	Confirmación incluida

📦 Archivo de exportación de ejemplo

En /assets/export_ejemplo.json se incluye un ejemplo con 3 partidas registradas para comprobación de estructura y formato.

👨‍💻 Autores

Gabriel Córdova — Estructura HTML5, diseño CSS3, base JS y control de flujo.

Daniel Pacheco — Lógica del juego, persistencia, historial, filtros y exportación.

📅 Validaciones

HTML validado con W3C Validator
.

CSS validado con W3C CSS Validator
.

Ningún error crítico reportado.
