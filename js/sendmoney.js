const amountInput = document.getElementById("amount");
const contactInput = document.getElementById("contact");
const sendBtn = document.getElementById("sendBtn");
const message = document.getElementById("message");

// Obtener saldo y transacciones
let balance = parseInt(localStorage.getItem("balance")) || 0;
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

sendBtn.addEventListener("click", () => {
  const amount = parseInt(amountInput.value);
  const contact = contactInput.value.trim();

  if (!contact) {
    message.textContent = "Ingrese un contacto";
    message.style.color = "red";
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    message.textContent = "Ingrese un monto válido";
    message.style.color = "red";
    return;
  }

  if (amount > balance) {
    message.textContent = "Saldo insuficiente";
    message.style.color = "red";
    return;
  }

  // Descontar saldo
  balance -= amount;
  localStorage.setItem("balance", balance);

  // Crear transacción
  const transaction = {
    date: new Date().toLocaleString(),
    type: "Envío",
    detail: contact,
    amount: amount
  };

  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  message.textContent = "Envío realizado con éxito";
  message.style.color = "green";

  amountInput.value = "";
  contactInput.value = "";
});
