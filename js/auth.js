// auth.js
const isLoggedIn = localStorage.getItem("isLoggedIn");

// Solo proteger páginas que NO sean login/index
const path = window.location.pathname.toLowerCase();
const isPublic = path.endsWith("/login.html") || path.endsWith("/index.html");

if (!isPublic && isLoggedIn !== "true") {
  window.location.href = "login.html";
}
