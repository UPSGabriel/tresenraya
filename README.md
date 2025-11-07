# Tres en Raya (HTML5/CSS3/JS — ESM)

Proyecto académico que implementa un juego accesible de **Tres en Raya** con:
- Tablero 3×3 usable con **ratón y teclado** (flechas + Enter/Espacio).
- **Alternancia automática** de turnos, bloqueo de celdas ocupadas.
- **Detección** de victoria/empate.
- **Contador** de movimientos.
- **Cronómetro** de partida y **duración (mm:ss)**.
- Acciones: **Revancha** (mismos jugadores) y **Nuevo juego** (cambiar jugadores).
- **Persistencia** con `localStorage` (namespacing `ppw-tresenraya:*`).
- **Historial** con filtros (ganador, rango de fechas), **exportación JSON** y **limpiar** con confirmación.
- **HTML5 semántico** + **accesibilidad** (aria-live, focus visible, etiquetas asociadas) + **CSS3 responsivo**.
- **Módulos ES** (`type="module"`) y separación de responsabilidades: `game.js` (UI/lógica) y `storage.js` (persistencia).

## Estructura
```
/tresenraya/
  index.html
  /css/
    styles.css
  /js/
    game.js
    storage.js
  /assets/ (opcional)
  README.md
```

## Ejecución local
> Debido al uso de **módulos ES** debes servir el sitio por **HTTP** (no abrir el HTML directamente).

### Opción A: WebStorm
1. Abre la carpeta del proyecto en WebStorm.
2. Clic derecho en `index.html` → **Open in Browser** (WebStorm levanta un servidor estático).
3. Alternativa: Run/Debug Configurations → **JavaScript Debug** apuntando a `index.html`.

### Opción B: Node (cualquier IDE)
```bash
npx serve .
# o
python -m http.server 8080
```
Luego visita `http://localhost:3000` (serve) o `http://localhost:8080`.

## Decisiones técnicas
- **Persistencia:** `localStorage` por simplicidad y alcance del laboratorio. La carga es inmediata, no requiere Promesas ni esquemas. Con más volumen o consultas complejas, elegiríamos **IndexedDB**.
- **Estructura de datos (historial):**
```json
[
  {
    "id": "uuid",
    "fechaISO": "2025-11-06T12:34:56",
    "jugador1": "Gabriel",
    "jugador2": "Daniel",
    "ganador": "J1 | J2 | Empate",
    "duracion": "mm:ss",
    "movimientos": 7
  }
]
```
- **Namespacing:** clave `ppw-tresenraya:games` para evitar colisiones con otros proyectos del navegador.

## Lista de comprobación de estándares
- **Semántica HTML5:** `header`, `main`, `section`, `aside`, `footer`, `fieldset`, `legend`, `table` con `caption`.
- **Accesibilidad:** `lang="es"`, `meta viewport`, `aria-live` para estado/turno/cronómetro, navegación por teclado (flechas + Enter), foco visible (`:focus-visible`), etiquetas de formulario.
- **CSS3:** responsivo móvil/escritorio, `:hover`, `:focus-visible`, `:disabled`, contraste alto.
- **JavaScript:** módulos ES, separación UI/persistencia, nombres descriptivos, sin errores en consola.
- **Validación W3C:** HTML y CSS sin errores críticos (ver evidencias).

## Capturas requeridas (añadir en /assets)
- Vista **móvil** y **escritorio** del tablero.
- **Partida finalizada** (victoria y empate).
- Vista de **historial con filtros** aplicados.

## Export JSON de ejemplo
Guarda como `assets/export_ejemplo.json` y súbelo al repo.
```json
[
  {
    "id": "e1",
    "fechaISO": "2025-11-01T10:15:00",
    "jugador1": "Gabriel",
    "jugador2": "Daniel",
    "ganador": "J1",
    "duracion": "01:05",
    "movimientos": 5
  },
  {
    "id": "e2",
    "fechaISO": "2025-11-02T18:30:00",
    "jugador1": "Gabriel",
    "jugador2": "Daniel",
    "ganador": "Empate",
    "duracion": "02:40",
    "movimientos": 9
  },
  {
    "id": "e3",
    "fechaISO": "2025-11-03T09:12:00",
    "jugador1": "Gabriel",
    "jugador2": "Daniel",
    "ganador": "J2",
    "duracion": "00:55",
    "movimientos": 6
  }
]
```

## Evidencias de validación
- Usar **W3C HTML Validator** y **W3C CSS Validator**. Adjuntar capturas en `/assets/` con nombre `val-html.png` y `val-css.png` cuando validen su versión definitiva.

## GitHub — pasos rápidos
1. Crear el repo **público** llamado `tresenraya` en tu cuenta o la de la pareja (añade al compañero como Collaborator).
2. En **WebStorm**: `File → New → Project from Existing Sources...` y selecciona esta carpeta (o clónalo si ya existe).
3. Inicializa Git si no lo está: `VCS → Enable Version Control Integration → Git`.
4. Primer commit:
   - Check todos los archivos → **Commit** con mensaje `feat: versión inicial del juego`
   - **Push** al repositorio remoto (WebStorm te pedirá URL del repo).
5. Activa **GitHub Pages (opcional)** para demo: Settings → Pages → Deploy from **Branch** (`main` / `/root`).

## Créditos
- Autores: **Gabriel** & **Daniel**.
- Licencia: MIT (opcional).
