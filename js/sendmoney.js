$(document).ready(function () {
  const $amount = $("#amount");
  const $contact = $("#contact");
  const $sendBtn = $("#sendBtn");
  const $message = $("#message");
  const $suggestions = $("#contactSuggestions");

  // Datos
  let balance = parseInt(localStorage.getItem("balance")) || 0;
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  // Lista simple de contactos (puedes ampliarla)
  let contacts = JSON.parse(localStorage.getItem("contacts")) || ["Tavo", "Belén", "Camila", "Pablo"];

  // Guardar contactos si aún no existen
  localStorage.setItem("contacts", JSON.stringify(contacts));

  function showMessage(text, ok) {
    $message
      .text(text)
      .removeClass("text-success text-danger")
      .addClass(ok ? "text-success" : "text-danger")
      .hide()
      .fadeIn(150);
  }

  function saveAll() {
    localStorage.setItem("balance", balance);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  // Autocompletar: filtra mientras escribes
  $contact.on("input", function () {
    const q = $contact.val().trim().toLowerCase();

    $suggestions.empty();

    if (!q) {
      $suggestions.hide();
      return;
    }

    const matches = contacts.filter((c) => c.toLowerCase().includes(q)).slice(0, 5);

    if (matches.length === 0) {
      $suggestions.hide();
      return;
    }

    matches.forEach((name) => {
      const $item = $(`<button type="button" class="list-group-item list-group-item-action">${name}</button>`);
      $item.on("click", function () {
        $contact.val(name);
        $suggestions.hide();
      });
      $suggestions.append($item);
    });

    $suggestions.slideDown(120);
  });

  // Ocultar sugerencias si haces click fuera
  $(document).on("click", function (e) {
    if (!$(e.target).closest("#contact, #contactSuggestions").length) {
      $suggestions.hide();
    }
  });

  // Enviar dinero
  $sendBtn.on("click", function () {
    const amount = parseInt($amount.val(), 10);
    const contactName = $contact.val().trim();

    if (!contactName) return showMessage("Ingrese un contacto", false);
    if (isNaN(amount) || amount <= 0) return showMessage("Ingrese un monto válido", false);
    if (amount > balance) return showMessage("Saldo insuficiente", false);

    // Descontar
    balance -= amount;

    // Registrar transacción
    transactions.push({
      date: new Date().toLocaleString(),
      type: "Envío",
      detail: contactName,
      amount: amount
    });

    // Guardar contacto nuevo si no existe
    if (!contacts.some((c) => c.toLowerCase() === contactName.toLowerCase())) {
      contacts.push(contactName);
    }

    saveAll();

    showMessage("Envío realizado con éxito", true);

    $amount.val("");
    $contact.val("");
    $suggestions.hide();
  });
});
