import {
  getAllIncomeData,
  getAllExpensesData,
  
} from "./month.js";

export function loadHistory () {

  const arena = document.getElementById('main-arena');
  arena.innerHTML = "";
  

  const historyWrapper = document.createElement('div');
  historyWrapper.classList.add("history-wrapper");

 

  function formatMonth(monthKey) {
    const [year, month] = monthKey.split("-");

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    return `${monthNames[Number(month) - 1]} ${year}`;
  }  

  
    const allIncome = getAllIncomeData();
    const allExpenses = getAllExpensesData();

    const months = [
      ...new Set([
        ...Object.keys(allIncome),
        ...Object.keys(allExpenses)
      ])
    ].sort().reverse();

    months.forEach(month =>{
      const income = allIncome[month]?.income || 0;
      const expensesArr = allExpenses[month]?.expenses || [];

      const expenseTotal = expensesArr.reduce(
        (sum, exp) => sum + exp.amount,
        0,

        
        
      );
      



      const monthCard = document.createElement("div");
      monthCard.classList.add("month-card");

    const title = document.createElement("h3");
    title.classList.add("month-title");
    title.textContent = formatMonth(month);

    const incomeEl = document.createElement("div");
    incomeEl.classList.add("row", "income");
    incomeEl.innerHTML = `<span>Income</span><span>₹${income}</span>`;

    const expenseEl = document.createElement("div");
    expenseEl.classList.add("row", "expense");
    expenseEl.innerHTML = `<span>Expenses</span><span>₹${expenseTotal} 
    (${income > 0 ?((expenseTotal/income) * 100).toFixed(1) : 0}%)</span>`;

    const savingsEl = document.createElement("div");
    savingsEl.classList.add("row", "savings");
    savingsEl.innerHTML = `<span>Savings</span><span>₹${income - expenseTotal} 
    (${income > 0 ? (((income - expenseTotal) / income) * 100).toFixed(1) : 0}%)</span>`;



    monthCard.appendChild(title);
    monthCard.appendChild(incomeEl);
    monthCard.appendChild(expenseEl);
    monthCard.appendChild(savingsEl);
    arena.appendChild(monthCard);











})







}
