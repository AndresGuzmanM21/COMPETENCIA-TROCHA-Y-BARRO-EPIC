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
  "img/fotos/cobos subiendo panamatranqui.jpeg",
  "img/fotos/fabianpaimento.jpeg",
  "img/fotos/leidy subiendo copy.jpeg",
  "img/fotos/candelera.jpeg",
  "img/fotos/soachaparque.jpeg",
  "img/fotos/grupalarriba.jpeg",
  "img/fotos/trocha y barro.jpeg",
  "img/fotos/fotogrupalladrilleras.jpeg",
  "img/fotos/chalabajando.jpeg",
  "img/fotos/grupalarriba.jpeg",
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

const fotosPorCarga = 8;
let fotosMostradas = 0;
let isLoadingMore = false;

// ==========================================
// PRELOADER
// ==========================================

function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  
  window.addEventListener('load', function() {
    setTimeout(function() {
      preloader.classList.add('hidden');
      document.body.style.overflow = 'auto';
      initRevealAnimations();
    }, 1800);
  });
  
  // Fallback si el evento load ya se disparó
  if (document.readyState === 'complete') {
    setTimeout(function() {
      preloader.classList.add('hidden');
      document.body.style.overflow = 'auto';
      initRevealAnimations();
    }, 1800);
  }
}

// ==========================================
// CUSTOM CURSOR
// ==========================================

function initCustomCursor() {
  const dot = document.getElementById('cursorDot');
  const outline = document.getElementById('cursorOutline');
  
  if (!dot || !outline) return;
  
  // Verificar si es dispositivo táctil
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    dot.style.display = 'none';
    outline.style.display = 'none';
    return;
  }
  
  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;
  
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });
  
  // Smooth follow for outline
  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    
    outline.style.left = outlineX + 'px';
    outline.style.top = outlineY + 'px';
    
    requestAnimationFrame(animateOutline);
  }
  animateOutline();
  
  // Hover effects
  const hoverElements = document.querySelectorAll('a, button, .route-card, .gallery-item, .epic-photo-nueva');
  
  hoverElements.forEach(function(el) {
    el.addEventListener('mouseenter', function() {
      dot.classList.add('hover');
      outline.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', function() {
      dot.classList.remove('hover');
      outline.classList.remove('hover');
    });
  });
}

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================

function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-up');
  
  function checkReveal() {
    const windowHeight = window.innerHeight;
    
    reveals.forEach(function(element) {
      const elementTop = element.getBoundingClientRect().top;
      const revealPoint = 100;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', checkReveal);
  checkReveal(); // Check on load
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  
  if (!toggle || !links) return;
  
  toggle.addEventListener('click', function() {
    toggle.classList.toggle('active');
    links.classList.toggle('active');
  });
  
  // Close menu when clicking a link
  const navLinksItems = links.querySelectorAll('a');
  navLinksItems.forEach(function(link) {
    link.addEventListener('click', function() {
      toggle.classList.remove('active');
      links.classList.remove('active');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      toggle.classList.remove('active');
      links.classList.remove('active');
    }
  });
}

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================

function initScrollToTop() {
  const scrollTopBtn = document.getElementById('scrollTop');
  if (!scrollTopBtn) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

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
  tarjeta.className = "epic-photo-nueva";

  tarjeta.onclick = function () {
    abrirImagen(this);
  };

  const imagen = document.createElement("img");
  imagen.src = rutaFotos + nombre;
  imagen.alt = "Trocha Y Barro EPIC 2026 - Foto " + numero;
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
// CARGAR FOTOS (INFINITE SCROLL)
// ==========================================

function cargarMasFotos() {
  if (isLoadingMore || fotosMostradas >= fotosEpic.length) return;
  
  isLoadingMore = true;
  const loadingIndicator = document.getElementById("loadingIndicator");
  if (loadingIndicator) loadingIndicator.style.display = "flex";

  setTimeout(function() {
    const siguiente = Math.min(fotosMostradas + fotosPorCarga, fotosEpic.length);

    for (let i = fotosMostradas; i < siguiente; i++) {
      crearFoto(fotosEpic[i], i + 1);
    }

    fotosMostradas = siguiente;
    actualizarContadorFotos();
    isLoadingMore = false;
    
    if (loadingIndicator) {
      loadingIndicator.style.display = fotosMostradas >= fotosEpic.length ? "none" : "flex";
    }
  }, 300);
}

// ==========================================
// INFINITE SCROLL OBSERVER
// ==========================================

function initInfiniteScroll() {
  const sentinel = document.getElementById("scrollSentinel");
  if (!sentinel) return;

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !isLoadingMore && fotosMostradas < fotosEpic.length) {
        cargarMasFotos();
      }
    });
  }, {
    rootMargin: "200px"
  });

  observer.observe(sentinel);
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
  tarjeta.className = "epic-video-card";

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
    }, 400);
  }
}

// ==========================================
// PARALLAX EFFECT
// ==========================================

function initParallax() {
  const hero = document.querySelector('.hero');
  const experience = document.querySelector('.experience');
  const epicSection = document.querySelector('.epic-background');
  
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    if (hero) {
      const heroContent = hero.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
        heroContent.style.opacity = 1 - (scrolled / 700);
      }
    }
    
    if (experience) {
      const experienceContent = experience.querySelector('.experience-content');
      if (experienceContent) {
        const rect = experience.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const parallaxValue = (window.innerHeight - rect.top) * 0.1;
          experienceContent.style.transform = 'translateY(' + parallaxValue + 'px)';
        }
      }
    }
  });
}

// ==========================================
// TYPING EFFECT FOR HERO
// ==========================================

function initTypingEffect() {
  const heroSmall = document.querySelector('.hero-small');
  if (!heroSmall) return;
  
  const text = heroSmall.textContent;
  heroSmall.textContent = '';
  heroSmall.style.borderRight = '2px solid var(--rojo)';
  
  let i = 0;
  
  function typeWriter() {
    if (i < text.length) {
      heroSmall.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 80);
    } else {
      setTimeout(function() {
        heroSmall.style.borderRight = 'none';
      }, 1000);
    }
  }
  
  setTimeout(typeWriter, 2000);
}

// ==========================================
// EVENTOS DOM
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all features
  initPreloader();
  initCustomCursor();
  initNavbarScroll();
  initMobileMenu();
  initScrollToTop();
  initSmoothScroll();
  initParallax();
  initTypingEffect();
  
  // Modal events
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

  // Load gallery
  cargarMasFotos();
  initInfiniteScroll();
  cargarVideos();
  mostrarGaleria("fotos");
});
