$(document).ready(function () {
  const $balance = $("#balance");
  const $amount = $("#amount");
  const $msg = $("#depositMessage");
  const $btn = $("#depositBtn");

  let balance = parseInt(localStorage.getItem("balance")) || 0;
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  function renderBalance() {
    $balance.text(balance);
  }

  function showMessage(text, ok) {
    $msg
      .text(text)
      .removeClass("text-success text-danger")
      .addClass(ok ? "text-success" : "text-danger")
      .hide()
      .fadeIn(150);
  }

  renderBalance();

  $btn.on("click", function () {
    const amount = parseInt($amount.val(), 10);

    if (isNaN(amount) || amount <= 0) return showMessage("Ingrese un monto válido", false);

    balance += amount;
    localStorage.setItem("balance", balance);

    transactions.push({
      date: new Date().toLocaleString(),
      type: "Depósito",
      detail: "Depósito",
      amount: amount
    });
    localStorage.setItem("transactions", JSON.stringify(transactions));

    renderBalance();
    showMessage("Depósito realizado con éxito", true);

    $amount.val("");
  });
});
