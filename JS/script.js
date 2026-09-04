// ==========================================
// TROCHA Y BARRO
// GALERÍA EPIC 2026
// ==========================================

// ==========================================
// FOTOS REALES
// ==========================================

const fotosEpic = [
  "img/fotos/chala.jpeg",
  "img/fotos/cobos.jpeg",
  "img/fotos/fandiño.jpeg",
  "img/fotos/larry.jpeg",
  "img/fotos/morfeo.jpeg",
  "img/fotos/tyb.jpeg",
  "img/fotos/andresyJ.jpeg",
  "img/fotos/andres tyb.jpeg",
  "img/fotos/cobos subiendo panamatranqui copy.jpeg",
  "img/fotos/fabianpaimento.jpeg",
  "img/fotos/leidy subiendo copy.jpeg",
  "img/fotos/candelera.jpeg",
  "img/fotos/soachaparque.jpeg",
  "img/fotos/grupalarriba.jpeg",
  "img/fotos/trocha y barro.jpeg",
  "img/fotos/fotogrupalladrilleras.jpeg",
  "img/fotos/grupalabajo.jpeg",
  "img/fotos/grupalarriba2.jpeg",
  "img/fotos/epic1.jpeg",
  "img/fotos/epic2.jpeg",
  "img/fotos/epic3.jpeg",
];

// ==========================================
// VIDEOS REALES
// ==========================================

const videosEpic = [
  "img/videos/bajando despues de la U.mp4",
  "img/videos/bajando piedras para empezar a bajar san mateo.mp4",
  "img/videos/bajando tecnica.mp4",
  "img/videos/cobos subiendo con yosep panama.mp4",
  "img/videos/empezando a subir bajada tecnica.mp4",
  "img/videos/larry subiendo panama.mp4",
  "img/videos/WhatsApp Video 2026-08-11 at 5.42.32 PM.mp4",
  "img/videos/WhatsApp Video 2026-08-11 at 5.42.36 PM.mp4",
  "img/videos/WhatsApp Video 2026-08-12 at 5.43.03 PM.mp4",
  "img/videos/WhatsApp Video 2026-08-18 at 1.09.46 PM.mp4",
  "img/videos/WhatsApp Video 2026-08-18 at 1.09.49 PM.mp4",
  "img/videos/WhatsApp Video 2026-08-18 at 1.09.50 PM.mp4",
  "img/videos/WhatsApp Video 2026-08-18 at 1.09.51 PM.mp4",
  "img/videos/subida antes de rompebiker.mp4",
  "img/videos/subiendo piedras finalizando ruta.mp4",
  "img/videos/trochaybarroepic.mp4",
];

// ==========================================
// CONFIGURACIÓN (Rutas corregidas a cadena vacía)
// ==========================================

const rutaFotos = "";
const rutaVideos = "";

const fotosPorCarga = 12;
let fotosMostradas = 0;

// ==========================================
// CREAR ELEMENTOS
// ==========================================

function crearFoto(nombre, numero) {
  const contenedor = document.getElementById("galeriaEpicFotos");

  if (!contenedor) {
    console.error("No existe #galeriaEpicFotos");
    return;
  }

  const tarjeta = document.createElement("div");
  tarjeta.className = "epic-photo";

  tarjeta.onclick = function () {
    abrirImagen(this);
  };

  const imagen = document.createElement("img");
  imagen.src = rutaFotos + nombre;
  imagen.alt = "Trocha Y Barro EPIC 2026";
  imagen.loading = "lazy";

  imagen.onerror = function () {
    console.error("No se encontró la foto:", imagen.src);
    tarjeta.remove();
  };

  tarjeta.appendChild(imagen);

  const numeroFoto = document.createElement("span");
  numeroFoto.className = "photo-number";
  numeroFoto.textContent = String(numero).padStart(2, "0");

  tarjeta.appendChild(numeroFoto);
  contenedor.appendChild(tarjeta);
}

// ==========================================
// CARGAR FOTOS
// ==========================================

function cargarMasFotos() {
  const siguiente = Math.min(fotosMostradas + fotosPorCarga, fotosEpic.length);

  for (let i = fotosMostradas; i < siguiente; i++) {
    crearFoto(fotosEpic[i], i + 1);
  }

  fotosMostradas = siguiente;
  actualizarContadorFotos();

  const boton = document.getElementById("btnCargarMas");
  if (boton) {
    if (fotosMostradas >= fotosEpic.length) {
      boton.style.display = "none";
    } else {
      boton.style.display = "inline-flex";
    }
  }
}

// ==========================================
// CONTADOR DE FOTOS
// ==========================================

function actualizarContadorFotos() {
  const contador = document.getElementById("contadorFotos");
  if (!contador) return;
  contador.textContent = fotosEpic.length + " FOTOS";
}

// ==========================================
// CREAR VIDEO
// ==========================================

function crearVideo(nombre, numero) {
  const contenedor = document.getElementById("galeriaEpicVideos");

  if (!contenedor) {
    console.error("No existe #galeriaEpicVideos");
    return;
  }

  const tarjeta = document.createElement("div");
  tarjeta.className = "epic-video";

  const video = document.createElement("video");
  video.controls = true;
  video.preload = "metadata";
  video.playsInline = true;
  video.setAttribute("controlsList", "nodownload");

  const fuente = document.createElement("source");
  fuente.src = rutaVideos + nombre;
  fuente.type = "video/mp4";

  video.appendChild(fuente);

  video.onerror = function () {
    console.error("No se encontró el video:", fuente.src);
    tarjeta.remove();
  };

  tarjeta.appendChild(video);

  const numeroVideo = document.createElement("span");
  numeroVideo.className = "video-number";
  numeroVideo.textContent = "VIDEO " + String(numero).padStart(2, "0");

  tarjeta.appendChild(numeroVideo);
  contenedor.appendChild(tarjeta);
}

// ==========================================
// CARGAR VIDEOS
// ==========================================

function cargarVideos() {
  const contenedor = document.getElementById("galeriaEpicVideos");

  if (!contenedor) {
    console.error("No existe #galeriaEpicVideos");
    return;
  }

  contenedor.innerHTML = "";

  videosEpic.forEach(function (video, index) {
    crearVideo(video, index + 1);
  });

  actualizarContadorVideos();
}

// ==========================================
// CONTADOR DE VIDEOS
// ==========================================

function actualizarContadorVideos() {
  const contador = document.getElementById("contadorVideos");
  if (!contador) return;
  contador.textContent = videosEpic.length + " VIDEOS";
}

// ==========================================
// CAMBIAR ENTRE FOTOS Y VIDEOS
// ==========================================

function mostrarGaleria(tipo) {
  const fotos = document.getElementById("galeriaEpicFotos");
  const videos = document.getElementById("galeriaEpicVideos");
  const btnCargarMas = document.getElementById("contenedorCargarMas");
  const botones = document.querySelectorAll(".epic-filtro");

  if (tipo === "fotos") {
    if (fotos) fotos.style.display = "grid";
    if (videos) videos.style.display = "none";
    if (btnCargarMas)
      btnCargarMas.style.display =
        fotosMostradas < fotosEpic.length ? "flex" : "none";
  }

  if (tipo === "videos") {
    if (fotos) fotos.style.display = "none";
    if (videos) videos.style.display = "grid";
    if (btnCargarMas) btnCargarMas.style.display = "none";
  }

  botones.forEach(function (boton) {
    boton.classList.remove("activo");
    if (
      boton.getAttribute("onclick") &&
      boton.getAttribute("onclick").includes(tipo)
    ) {
      boton.classList.add("activo");
    }
  });
}

// ==========================================
// MODAL DE IMAGEN
// ==========================================

function abrirImagen(elemento) {
  const imagen = elemento.querySelector("img") || elemento;
  const modal = document.getElementById("modal");
  const imagenGrande = document.getElementById("imagenGrande");

  if (!imagen || !modal || !imagenGrande) return;

  imagenGrande.src = imagen.src;
  imagenGrande.alt = imagen.alt || "Imagen";
  modal.classList.add("activo");
  document.body.style.overflow = "hidden";
}

function cerrarImagen() {
  const modal = document.getElementById("modal");
  const imagenGrande = document.getElementById("imagenGrande");

  if (!modal) return;

  modal.classList.remove("activo");
  document.body.style.overflow = "auto";

  if (imagenGrande) {
    setTimeout(function () {
      imagenGrande.src = "";
    }, 300);
  }
}

// ==========================================
// EVENTOS DOM
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");

  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        cerrarImagen();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      cerrarImagen();
    }
  });

  cargarMasFotos();
  cargarVideos();
  mostrarGaleria("fotos");
});
