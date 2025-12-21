import './styles.css'
import { 
  getActiveIncome, 
  getActiveTotalExpenses, 
  getActiveRemaining,
  getCurrentMonthKey,
  setActiveMonth,
  getActiveMonth
} from './month.js'

export function loadHome() {
  const arena = document.getElementById("main-arena");
  arena.innerHTML = "";  

  const wrapper = document.createElement("div");
  wrapper.classList.add("home-wrapper");

  // TITLE
  const title = document.createElement("h1");
  title.classList.add("title");
  title.innerHTML = "<strong>Finance Manager</strong>";

  // Month Selector
  const monthContainer = document.createElement("div");
  monthContainer.classList.add("chooseMonth");
  
  const selectMonth = document.createElement("select");
  selectMonth.id = "monthSelect";
  
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // ✅ ADDED: Generate options for current year and past/future months
  const currentYear = new Date().getFullYear();
  const currentMonthIndex = new Date().getMonth();
  
  // Add past 6 months and future 6 months
  for (let i = -12; i <= 12; i++) {
    const date = new Date(currentYear, currentMonthIndex + i, 1);
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const monthName = months[monthIndex];
    
    const option = document.createElement("option");
    option.value = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
    option.textContent = `${monthName} ${year}`;
    selectMonth.appendChild(option);
  }
  
  // Set current month as selected
  selectMonth.value = getCurrentMonthKey();
  
  monthContainer.appendChild(selectMonth);

  // Dashboard Stats Section
  const dashboardStats = document.createElement("div");
  dashboardStats.classList.add("dashboard-stats");
  dashboardStats.id = "dashboard-stats";

  // Function to render dashboard
  function renderDashboard() {
    const income = getActiveIncome();
    const totalExpenses = getActiveTotalExpenses();
    const remaining = getActiveRemaining();
    const monthKey = getActiveMonth();

    dashboardStats.innerHTML = `
      <div class="stat-card income-card">
        <h3>Total Income</h3>
        <p class="amount">₹${income.toLocaleString()}</p>
      </div>

      <div class="stat-card expenses-card">
        <h3>Total Expenses</h3>
        <p class="amount">₹${totalExpenses.toLocaleString()}</p>
      </div>

      <div class="stat-card remaining-card ${remaining >= 0 ? 'positive' : 'negative'}">
        <h3>Remaining</h3>
        <p class="amount">₹${remaining.toLocaleString()}</p>
      </div>

      <div class="stat-card month-card">
        <h3>Active Month</h3>
        <p class="month-text">${monthKey}</p>
      </div>
    `;
  }

  // ✅ UPDATED: Month selector change event
  selectMonth.addEventListener("change", () => {
    const selectedMonthKey = selectMonth.value; // Already in "YYYY-MM" format
    setActiveMonth(selectedMonthKey);
    renderDashboard(); // Update dashboard
    console.log("Switched to month:", selectedMonthKey); 
  });

  wrapper.appendChild(title);
  wrapper.appendChild(monthContainer);
  wrapper.appendChild(dashboardStats);

  arena.appendChild(wrapper);

  // Initial render
  renderDashboard();
}