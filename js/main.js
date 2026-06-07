// ===== REEMPLAZA CON TU URL DE APPS SCRIPT =====
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzIqU9PIMKIMGdmMmA0keHkDekEvcvMtj1kbuoSwbLUg67jmpljgJF-LpxgFVmtTn1sJw/exec";

// ===== CURSOR PERSONALIZADO =====
const cursor = document.getElementById("cursor");
const cursorFollower = document.getElementById("cursorFollower");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  setTimeout(() => {
    cursorFollower.style.left = e.clientX + "px";
    cursorFollower.style.top = e.clientY + "px";
  }, 80);
});

document.querySelectorAll("a, button, input, select, textarea").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursorFollower.style.transform = "translate(-50%, -50%) scale(1.8)";
    cursorFollower.style.borderColor = "#525252";
  });
  el.addEventListener("mouseleave", () => {
    cursorFollower.style.transform = "translate(-50%, -50%) scale(1)";
    cursorFollower.style.borderColor = "#525252";
  });
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

// ===== ANIMACION AL SCROLL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".nos-card, .srv-card, .cliente-item, .numero-card").forEach((el, i) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = `opacity 0.5s ${i * 0.08}s ease, transform 0.5s ${i * 0.08}s ease`;
  observer.observe(el);
});

// ===== FORMULARIO =====
const formulario = document.getElementById("formulario");
const mensajeRespuesta = document.getElementById("mensaje-respuesta");

formulario.addEventListener("submit", async function (e) {
  e.preventDefault();

  const datos = {
    nombre: document.getElementById("nombre").value,
    empresa: document.getElementById("empresa").value,
    telefono: document.getElementById("telefono").value,
    correo: document.getElementById("correo").value,
    servicio: document.getElementById("servicio").value,
    mensaje: document.getElementById("mensaje").value,
  };

  const boton = formulario.querySelector("button[type='submit']");
  boton.textContent = "Enviando...";
  boton.disabled = true;

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    mensajeRespuesta.textContent = "Solicitud enviada. Te contactaremos pronto.";
    mensajeRespuesta.style.color = "#111111";
    formulario.reset();
  } catch (error) {
    mensajeRespuesta.textContent = "Hubo un error. Intenta de nuevo.";
    mensajeRespuesta.style.color = "#525252";
  }

  boton.textContent = "Enviar solicitud →";
  boton.disabled = false;
});
