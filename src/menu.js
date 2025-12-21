import './styles.css'
import { loadIncome } from "./income.js";
import { loadExpenses } from "./expenses.js";

export function loadMenu() {
  const arena = document.getElementById("main-arena");
  arena.innerHTML = "";

  const incomeSection = document.createElement("div");
  incomeSection.id = "menu-income-section";

  const expensesSection = document.createElement("div");
  expensesSection.id = "menu-expenses-section";

  arena.appendChild(incomeSection);
  arena.appendChild(expensesSection);

  
  loadIncome(incomeSection);
  loadExpenses(expensesSection);
}