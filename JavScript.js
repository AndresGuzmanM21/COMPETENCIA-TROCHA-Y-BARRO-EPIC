// Fecha del evento: 11 de Agosto de 2026 a las 6:00 AM
const fechaEvento = new Date("2026-08-11T06:00:00").getTime();

function actualizarContador() {
    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;

    // Si la fecha ya llegó o pasó
    if (diferencia <= 0) {
        document.getElementById("contador").innerHTML = "<h3 style='color:#ff3300; font-size: 24px; width: 100%; text-align: center;'>¡El evento ha comenzado!</h3>";
        return;
    }

    // Cálculos matemáticos de tiempo
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    // Muestra los números en las cajitas del HTML añadiendo el cero a la izquierda
    document.getElementById("dias").innerText = dias < 10 ? "0" + dias : dias;
    document.getElementById("horas").innerText = horas < 10 ? "0" + horas : horas;
    document.getElementById("minutos").innerText = minutos < 10 ? "0" + minutos : minutos; // Corregido 'minutes' por 'minutos'
    document.getElementById("segundos").innerText = segundos < 10 ? "0" + segundos : segundos;
}

// Ejecuta la función al cargar la página
actualizarContador();

// Actualiza los números cada 1 segundo en tiempo real
setInterval(actualizarContador, 1000);

// Funciones para la galería modal
function abrir(src) {
    document.getElementById("modal").style.display = "block";
    document.getElementById("imagenGrande").src = src;
}

function cerrar() {
    document.getElementById("modal").style.display = "none";
}
