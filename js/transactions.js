document.addEventListener("DOMContentLoaded", () => {
  const transactionsList = document.getElementById("transactionsList");
  const noTransactions = document.getElementById("noTransactions");

  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  if (transactions.length === 0) {
    noTransactions.style.display = "block";
    return;
  }

  noTransactions.style.display = "none";

  transactions.forEach(tx => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${tx.date}</td>
      <td>${tx.type}</td>
      <td>${tx.detail}</td>
      <td>$${tx.amount}</td>
    `;

    transactionsList.appendChild(tr);
  });
});
