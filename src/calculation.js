import { 
  getActiveIncome, 
  getActiveTotalExpenses, 
  getActiveRemaining,
  getCurrentMonthKey,
  setActiveMonth 
} from './month.js';


const income = getActiveIncome();
const totalExpenses = getActiveTotalExpenses();
const remaining = getActiveRemaining();

console.log("Income:", income);
console.log("Total Expenses:", totalExpenses);
console.log("Remaining:", remaining);


setActiveMonth("2024-11"); 
const novIncome = getActiveIncome();