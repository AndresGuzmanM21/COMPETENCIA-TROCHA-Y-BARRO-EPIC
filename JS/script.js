javascript;
/* =========================================================
   TROCHA Y BARRO EPIC
   GALERÍA AUTOMÁTICA DE FOTOS Y VIDEOS
========================================================= */

/* =========================================================
   CONFIGURACIÓN DE GITHUB
========================================================= */

// Usuario de GitHub
const GITHUB_USER = "andresguzmanm21";

// Nombre exacto del repositorio
const GITHUB_REPO = "COMPETENCIA-TROCHA-Y-BARRO-EPIC";

// Carpetas donde estarán las fotografías y videos
const CARPETA_FOTOS = "img/epic";
const CARPETA_VIDEOS = "img/videos";

/* =========================================================
   CONFIGURACIÓN DE LA GALERÍA
========================================================= */

const FOTOS_POR_CARGA = 24;

let archivosGaleria = [];

let archivosMostrados = 0;

let indiceActual = 0;

/* =========================================================
   ELEMENTOS DEL HTML
========================================================= */

const galeria = document.getElementById("epicGallery");

const botonCargarMas = document.getElementById("cargarMas");

const modal = document.getElementById("modal");

const modalMedia = document.getElementById("modalMedia");

const modalCounter = document.getElementById("modalCounter");

const botonCerrar = document.getElementById("cerrarModal");

const botonAnterior = document.getElementById("modalPrev");

const botonSiguiente = document.getElementById("modalNext");

/* =========================================================
   EXTENSIONES PERMITIDAS
========================================================= */

const extensionesImagen = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

const extensionesVideo = [".mp4", ".webm", ".mov"];

/* =========================================================
   URL DE LA API DE GITHUB
========================================================= */

function crearUrlApi(carpeta) {
  return `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${carpeta}`;
}

/* =========================================================
OBTENER ARCHIVOS DE GITHUB
========================================================= */

async function obtenerArchivos(carpeta, tipo) {
  try {
    const respuesta = await fetch(crearUrlApi(carpeta));

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al acceder a ${carpeta}`);
    }

    const archivos = await respuesta.json();

    return archivos
      .filter((archivo) => archivo.type === "file")
      .filter((archivo) => {
        const nombre = archivo.name.toLowerCase();

        if (tipo === "imagen") {
          return extensionesImagen.some((extension) =>
            nombre.endsWith(extension),
          );
        }

        if (tipo === "video") {
          return extensionesVideo.some((extension) =>
            nombre.endsWith(extension),
          );
        }

        return false;
      })
      .map((archivo) => ({
        nombre: archivo.name,

        url: archivo.download_url,

        tipo: tipo,
      }));
  } catch (error) {
    console.error(`No se pudieron cargar los archivos de ${carpeta}:`, error);

    return [];
  }
}

/* =========================================================
CARGAR TODA LA GALERÍA
========================================================= */

async function cargarGaleria() {
  mostrarMensajeCarga();

  const [fotos, videos] = await Promise.all([
    obtenerArchivos(CARPETA_FOTOS, "imagen"),

    obtenerArchivos(CARPETA_VIDEOS, "video"),
  ]);

  archivosGaleria = [...fotos, ...videos];

  /* Orden alfabético */

  archivosGaleria.sort((a, b) =>
    a.nombre.localeCompare(b.nombre, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );

  if (archivosGaleria.length === 0) {
    mostrarMensajeVacio();

    return;
  }

  galeria.innerHTML = "";

  archivosMostrados = 0;

  cargarMasArchivos();
}

/* =========================================================
MOSTRAR MENSAJE DE CARGA
========================================================= */

function mostrarMensajeCarga() {
  galeria.innerHTML = `

        <div class="gallery-loading">

            CARGANDO MEMORIAS...

        </div>

    `;
}

/* =========================================================
GALERÍA VACÍA
========================================================= */

function mostrarMensajeVacio() {
  galeria.innerHTML = `

        <div class="gallery-loading">

            TODAVÍA NO HAY FOTOS O VIDEOS.

            <br><br>

            Sube tus archivos a:

            <strong>img/epic/</strong>

            y

            <strong>img/videos/</strong>

        </div>

    `;

  botonCargarMas.style.display = "none";
}

/* =========================================================
CARGAR MÁS ARCHIVOS
========================================================= */

function cargarMasArchivos() {
  const siguienteCantidad = Math.min(
    archivosMostrados + FOTOS_POR_CARGA,
    archivosGaleria.length,
  );

  for (let i = archivosMostrados; i < siguienteCantidad; i++) {
    crearElementoGaleria(archivosGaleria[i], i);
  }

  archivosMostrados = siguienteCantidad;

  actualizarBotonCargarMas();
}

/* =========================================================
CREAR ELEMENTO DE GALERÍA
========================================================= */

function crearElementoGaleria(archivo, indice) {
  const elemento = document.createElement("div");

  elemento.className = "epic-photo";

  /* =========================================
    IMAGEN
    ========================================= */

  if (archivo.tipo === "imagen") {
    elemento.innerHTML = `

            <img
                src="${archivo.url}"
                alt="${obtenerTextoAlt(archivo.nombre)}"
                loading="lazy"
            >

            <div class="photo-number">

                ${formatearNumero(indice + 1)}

            </div>

        `;
  }

  /* =========================================
    VIDEO
    ========================================= */

  if (archivo.tipo === "video") {
    elemento.classList.add("epic-video");

    elemento.innerHTML = `

            <video
                src="${archivo.url}"
                muted
                playsinline
                preload="metadata"
            ></video>

            <div class="video-icon">
                ▶
            </div>

            <div class="photo-number">

                ${formatearNumero(indice + 1)}

            </div>

        `;
  }

  /* =========================================
    CLICK
    ========================================= */

  elemento.addEventListener("click", () => abrirGaleria(indice));

  galeria.appendChild(elemento);
}

/* =========================================================
NÚMERO CON DOS DÍGITOS
========================================================= */

function formatearNumero(numero) {
  return String(numero).padStart(2, "0");
}

/* =========================================================
TEXTO ALT
========================================================= */

function obtenerTextoAlt(nombre) {
  return nombre
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* =========================================================
ACTUALIZAR BOTÓN
========================================================= */

function actualizarBotonCargarMas() {
  if (archivosMostrados >= archivosGaleria.length) {
    botonCargarMas.style.display = "none";

    return;
  }

  botonCargarMas.style.display = "inline-flex";

  botonCargarMas.textContent = `CARGAR MÁS (${archivosGaleria.length - archivosMostrados})`;
}

/* =========================================================
ABRIR GALERÍA
========================================================= */

function abrirGaleria(indice) {
  if (indice < 0 || indice >= archivosGaleria.length) {
    return;
  }

  indiceActual = indice;

  mostrarArchivoActual();

  modal.classList.add("activo");

  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}

/* =========================================================
MOSTRAR ARCHIVO ACTUAL
========================================================= */

function mostrarArchivoActual() {
  const archivo = archivosGaleria[indiceActual];

  modalMedia.innerHTML = "";

  if (archivo.tipo === "imagen") {
    const imagen = document.createElement("img");

    imagen.src = archivo.url;

    imagen.alt = obtenerTextoAlt(archivo.nombre);

    modalMedia.appendChild(imagen);
  }

  if (archivo.tipo === "video") {
    const video = document.createElement("video");

    video.src = archivo.url;

    video.controls = true;

    video.autoplay = true;

    video.playsInline = true;

    video.preload = "metadata";

    modalMedia.appendChild(video);
  }

  modalCounter.textContent = `${indiceActual + 1} / ${archivosGaleria.length}`;
}

/* =========================================================
SIGUIENTE
========================================================= */

function siguienteArchivo() {
  if (archivosGaleria.length === 0) {
    return;
  }

  indiceActual++;

  if (indiceActual >= archivosGaleria.length) {
    indiceActual = 0;
  }

  mostrarArchivoActual();
}

/* =========================================================
ANTERIOR
========================================================= */

function anteriorArchivo() {
  if (archivosGaleria.length === 0) {
    return;
  }

  indiceActual--;

  if (indiceActual < 0) {
    indiceActual = archivosGaleria.length - 1;
  }

  mostrarArchivoActual();
}

/* =========================================================
CERRAR MODAL
========================================================= */

function cerrarGaleria() {
  modal.classList.remove("activo");

  modal.setAttribute("aria-hidden", "true");

  modalMedia.innerHTML = "";

  document.body.style.overflow = "";
}

/* =========================================================
EVENTOS
========================================================= */

/* Botón cargar más */

botonCargarMas.addEventListener("click", cargarMasArchivos);

/* Botón cerrar */

botonCerrar.addEventListener("click", cerrarGaleria);

/* Botón siguiente */

botonSiguiente.addEventListener("click", siguienteArchivo);

/* Botón anterior */

botonAnterior.addEventListener("click", anteriorArchivo);

/* Click fuera del contenido */

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    cerrarGaleria();
  }
});

/* =========================================================
   TECLADO
========================================================= */

document.addEventListener("keydown", function (event) {
  if (!modal.classList.contains("activo")) {
    return;
  }

  if (event.key === "Escape") {
    cerrarGaleria();
  }

  if (event.key === "ArrowRight") {
    siguienteArchivo();
  }

  if (event.key === "ArrowLeft") {
    anteriorArchivo();
  }
});

/* =========================================================
   INICIAR
========================================================= */

cargarGaleria();
