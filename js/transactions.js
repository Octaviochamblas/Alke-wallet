$(document).ready(function () {
  const $list = $("#transactionsList");
  const $noTx = $("#noTransactions");

  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  if (transactions.length === 0) {
    $noTx.show();
    return;
  }

  $noTx.hide();

  transactions.forEach((tx) => {
    const row = `
      <tr>
        <td>${tx.date}</td>
        <td>${tx.type}</td>
        <td>${tx.detail}</td>
        <td>$${tx.amount}</td>
      </tr>
    `;
    $list.append(row);
  });

  // Efecto suave al cargar tabla
  $("table").hide().fadeIn(200);
});
