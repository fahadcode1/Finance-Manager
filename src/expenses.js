import './styles.css'
import { saveExpensesForMonth, getExpensesForMonth, getActiveMonth } from './month.js';

export function loadExpenses(container) {  
  const arena = container || document.getElementById("main-arena");
  arena.innerHTML = "";
  const myExpenses = [];

  const defaultExpenses = [
    { title: "Rent", repeat: "monthly" },
    { title: "Electricity Bill", repeat: "monthly" },
    { title: "Groceries", repeat: "monthly" },
    { title: "Internet / Wifi", repeat: "monthly" },
    { title: "Water Bill", repeat: "monthly" },
    { title: "EMI", repeat: "monthly" },
  ];

  function Expense(title, amount, repeat){
    this.id = crypto.randomUUID();
    this.title = title;
    this.amount = amount;
    this.repeat = repeat;
  }

 
  function loadSavedExpenses() {
    const activeMonth = getActiveMonth();
    const saved = getExpensesForMonth(activeMonth);
    saved.forEach(exp => {
      myExpenses.push(exp);
    });
    console.log("Loaded expenses for month:", activeMonth, myExpenses); 
  }

  
  function saveExpensesToStorage() {
    const activeMonth = getActiveMonth();
    saveExpensesForMonth(activeMonth, myExpenses);
    console.log("Saved expenses for month:", activeMonth);
  }

  const wrapper = document.createElement("div");
  wrapper.classList.add("expense-wrapper");

  wrapper.innerHTML = `
    <h2>Default Monthly Expenses</h2>
    <div id="default-expense-container"></div>

    <h2>Add Custom Expense</h2>

    <label>Title</label>
    <input id="custom-title" type="text" placeholder="e.g., Insurance">

    <label>Amount</label>
    <input id="custom-amount" type="number" min="0" placeholder="0">

    <label>Frequency</label>
    <select id="custom-repeat">
      <option value="monthly">Monthly</option>
      <option value="weekly">Weekly</option>
      <option value="daily">Daily</option>
      <option value="one-time">One-time</option>
    </select>

    <button id="add-custom-expense">Add Custom Expense</button>

    <h3>Your Selected Expenses</h3>
    <div id="expense-list"></div>
  `;

  arena.appendChild(wrapper);

  const defaultContainer = document.getElementById("default-expense-container");

  loadSavedExpenses();

  defaultExpenses.forEach(item => {
    const row = document.createElement("div");
    row.classList.add("default-expense-row");

    const id = item.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

    row.innerHTML = `
      <input type="checkbox" id="${id}-check">
      <label for="${id}-check">${item.title}</label>

      <input 
        type="number" 
        id="${id}-amount" 
        placeholder="Amount" 
        min="0" 
        disabled
        style="width:110px;margin-left:8px;"
      >

      <select id="${id}-repeat" disabled style="margin-left:8px;">
        <option value="monthly">Monthly</option>
        <option value="weekly">Weekly</option>
        <option value="daily">Daily</option>
        <option value="one-time">One-time</option>
      </select>
    `;

    defaultContainer.appendChild(row);

    const checkbox = row.querySelector(`#${id}-check`);
    const amountInput = row.querySelector(`#${id}-amount`);
    const repeatSelect = row.querySelector(`#${id}-repeat`);

    const savedExpense = myExpenses.find(e => e.title === item.title);
    if (savedExpense) {
      checkbox.checked = true;
      amountInput.disabled = false;
      repeatSelect.disabled = false;
      amountInput.value = savedExpense.amount;
      repeatSelect.value = savedExpense.repeat;
    }

    checkbox.addEventListener("change", () => {
      const checked = checkbox.checked;

      amountInput.disabled = !checked;
      repeatSelect.disabled = !checked;

      if (!checked) {
        removeExpense(item.title);
        amountInput.value = "";
        repeatSelect.value = "monthly";
      } else {
        updateExpense(item.title, Number(amountInput.value || 0), repeatSelect.value);
      }

      saveExpensesToStorage();
      renderExpenses();
    });

    amountInput.addEventListener("input", () => {
      if (checkbox.checked) {
        updateExpense(item.title, Number(amountInput.value), repeatSelect.value);
        saveExpensesToStorage();
        renderExpenses();
      }
    });

    repeatSelect.addEventListener("change", () => {
      if (checkbox.checked) {
        updateExpense(item.title, Number(amountInput.value), repeatSelect.value);
        saveExpensesToStorage();
        renderExpenses();
      }
    });

  });

  function updateExpense(title, amount, repeat){
      const exists = myExpenses.find(e => e.title === title);
      if (exists) {
        exists.amount = amount;
        exists.repeat = repeat;
      } else {
        myExpenses.push(new Expense(title, amount, repeat));
      }
    }

  function removeExpense(title){
    const index = myExpenses.findIndex(e => e.title === title);
    if (index !== -1) myExpenses.splice(index, 1);
  }

  document.getElementById("add-custom-expense").addEventListener("click", () => {
    const title = document.getElementById("custom-title").value.trim();
    const amount = Number(document.getElementById("custom-amount").value);
    const repeat = document.getElementById("custom-repeat").value;

    if (!title || !amount) {
      alert("Fill all custom fields");
      return;
    }

    updateExpense(title, amount, repeat);

    document.getElementById("custom-title").value = "";
    document.getElementById("custom-amount").value = "";
    document.getElementById("custom-repeat").value = "monthly";

    saveExpensesToStorage();
    renderExpenses();
  });



  function renderExpenses(){
  const list = document.getElementById("expense-list");
  list.innerHTML = "";

  if (myExpenses.length === 0) {
    list.innerHTML = "<div>No expenses added.</div>";
    return;
  }

  myExpenses.forEach(exp => {
    const row = document.createElement("div");
    row.classList.add("expense-row");

    
    const text = document.createElement("span");
    text.textContent = `${exp.title} — ₹${exp.amount} (${exp.repeat})`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
      removeExpense(exp.title);
      saveExpensesToStorage();
      renderExpenses();
    });

    row.appendChild(text);       
    row.appendChild(deleteBtn);
    list.appendChild(row);
    });
  }

  renderExpenses();
}

export function getAllExpenses() {
  return getExpensesForMonth(getActiveMonth());
}

export function getTotalExpenses() {
  const expenses = getAllExpenses();
  return expenses.reduce((total, exp) => total + exp.amount, 0);
}