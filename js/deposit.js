const balanceSpan = document.getElementById("balance");
const amountInput = document.getElementById("amount");
const depositBtn = document.getElementById("depositBtn");
const message = document.getElementById("depositMessage");

let balance = localStorage.getItem("balance");

if (balance === null) {
  balance = 0;
  localStorage.setItem("balance", balance);
} else {
  balance = parseInt(balance);
}

balanceSpan.textContent = balance;

depositBtn.addEventListener("click", () => {
  const amount = parseInt(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    message.textContent = "Ingrese un monto válido";
    message.style.color = "red";
    return;
  }

  balance += amount;
  localStorage.setItem("balance", balance);

  balanceSpan.textContent = balance;
  message.textContent = "Depósito realizado con éxito";
  message.style.color = "green";

  amountInput.value = "";
});
