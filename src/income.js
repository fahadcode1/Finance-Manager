import './styles.css'
import { saveIncomeForMonth, getIncomeForMonth, getActiveMonth } from './month.js';

export function loadIncome(container) {  
  const income = container || document.getElementById('main-arena');
  
  const wrapper = document.createElement('div');
  wrapper.classList.add('amount', 'wrapper');

  const label = document.createElement("label");
  label.innerHTML = "<strong> Enter Net Income </strong>";
  label.setAttribute("for", "amountInput");



  const input = document.createElement('input');
  input.type = "number";
  input.id = "amountInput";
  input.placeholder = "0";
  input.min = "0";
  
  const defaultCheckLabel = document.createElement("label");
  defaultCheckLabel.setAttribute("for","default-income-check");
  defaultCheckLabel.textContent = "Set as Default Net income";


  //  Always load the ACTIVE month's income
  const activeMonth = getActiveMonth();
  const savedIncome = getIncomeForMonth(activeMonth);
  if (savedIncome) {
    input.value = savedIncome;
  }
  console.log("Loaded income for month:", activeMonth, "Amount:", savedIncome); 

  const saveButton = document.createElement("button");
  saveButton.id = "save-button";
  saveButton.textContent = "Save";

  saveButton.addEventListener("click", () => {
    const amount = Number(input.value);

    if (!amount || amount <= 0) {
      alert("Enter a valid amount");
      return;
    }

    try {
      const activeMonth = getActiveMonth(); // Get fresh active month
      saveIncomeForMonth(activeMonth, amount);
      
      console.log("Income saved:", amount, "for month:", activeMonth);
      alert(`Income saved for ${activeMonth}!`);
    } catch (err) {
      console.error("Failed to save:", err);
      alert("Failed to save income");
    }
  });

  wrapper.appendChild(label);
  wrapper.appendChild(input);
  wrapper.appendChild(saveButton);

  income.appendChild(wrapper);
}