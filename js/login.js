// Credenciales válidas (puedes cambiarlas si tu consigna lo indica)
const USER_OK = "admin";
const PASS_OK = "1234";

const form = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const message = document.getElementById("loginMessage");

function showMessage(text, ok) {
  message.textContent = text;
  message.className = ok
    ? "text-center mt-3 mb-0 text-success"
    : "text-center mt-3 mb-0 text-danger";
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); // evita recargar la página

  const user = usernameInput.value.trim();
  const pass = passwordInput.value.trim();

  if (user === USER_OK && pass === PASS_OK) {
    // guardamos "sesión" simple
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", user);

    showMessage("✅ Acceso correcto. Entrando...", true);

    // pequeña pausa para que se vea el mensaje
    setTimeout(() => {
      window.location.href = "menu.html";
    }, 300);
  } else {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    showMessage("❌ Usuario o contraseña incorrectos.", false);
  }
});
