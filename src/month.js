import { loadIncome } from "./income.js";
import { loadExpenses } from "./expenses.js";

let activeMonth = getCurrentMonthKey();


export function getCurrentMonthKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`; 
}


export function setActiveMonth(monthKey) {
  activeMonth = monthKey;
}


export function getActiveMonth() {
  return activeMonth;
}

// Load all income data (all months)
function loadIncomeData() {
  try {
    const data = localStorage.getItem("allIncome"); 
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Failed to load income data:", error);
    return {};
  }
}

// Load all expenses data (all months)
function loadExpensesData() {
  try {
    const data = localStorage.getItem("allExpenses"); 
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Failed to load expenses data:", error);
    return {};
  }
}

// Make sure a month exists in the data structure
function ensureMonth(data, monthKey) {
  if (!data[monthKey]) {
    data[monthKey] = {
      income: 0,
      expenses: []
    };
  }
  return data;
}

// Save income for specific month
export function saveIncomeForMonth(monthKey, amount) {
  try {
    const data = loadIncomeData();
    ensureMonth(data, monthKey);
    data[monthKey].income = amount;
    localStorage.setItem("allIncome", JSON.stringify(data)); 
    console.log("Saved income:", amount, "for month:", monthKey);
    return true;
  } catch (error) {
    console.error("Failed to save income:", error);
    return false;
  }
}

//  Get income for specific month
export function getIncomeForMonth(monthKey) {
  try {
    const data = loadIncomeData();
    return data[monthKey]?.income || 0;
  } catch (error) {
    console.error("Failed to get income:", error);
    return 0;
  }
}
export function convertToMonthly(amount, repeat){
 if (!amount || amount <= 0) return 0;
 switch(repeat){
  case "daily":
    return amount * 31;
    case "weekly" :
      return amount * 4.33;
      case "monthly" :
        return amount;
        case "one-time" :
          return amount;
          default :
           return amount;
 }

}

// Save expenses for specific month
export function saveExpensesForMonth(monthKey, expenses) {
  try {
    const data = loadExpensesData();
    ensureMonth(data, monthKey);
    data[monthKey].expenses = expenses;
    localStorage.setItem("allExpenses", JSON.stringify(data)); 
    console.log("Saved expenses for month:", monthKey);
    return true;
  } catch (error) {
    console.error("Failed to save expenses:", error);
    return false;
  }
}

// Get expenses for specific month
export function getExpensesForMonth(monthKey) {
  try {
    const data = loadExpensesData();
    return data[monthKey]?.expenses || [];
  } catch (error) {
    console.error("Failed to get expenses:", error);
    return [];
  }
}

// Get income for ACTIVE month
export function getActiveIncome() {
  return getIncomeForMonth(activeMonth);
}

// Get expenses for ACTIVE month
export function getActiveExpenses() {
  return getExpensesForMonth(activeMonth);
}

// Calculate total expenses for ACTIVE month
export function getActiveTotalExpenses() {
  const expenses = getActiveExpenses();

  return expenses.reduce((total, exp) => {
    return total + convertToMonthly(exp.amount, exp.repeat);
  }, 0);
}

// Calculate remaining budget for ACTIVE month
export function getActiveRemaining() {
  return getActiveIncome() - getActiveTotalExpenses();
}

export function getAllIncomeData() {
  return loadIncomeData();
}

export function getAllExpensesData() {
  return loadExpensesData();
}
