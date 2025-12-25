import { loadMainui } from './mainui.js';
import { loadHome } from './home.js';
import { loadMenu } from './menu.js';
import { loadInsights } from './insights.js'
import { loadHistory } from './history.js';
import { loadSettings} from './settings.js';
import './styles.css';


loadHome();
// Highlight helper
function setActiveButton(activeBtn) {
  const buttons = document.querySelectorAll('nav button');
  buttons.forEach(btn => btn.classList.remove('active'));
  activeBtn.classList.add('active');
}

document.addEventListener("DOMContentLoaded", () => {

  const homeButton = document.getElementById('dashboardBtn');
  const menuButton = document.getElementById('menuBtn');
  const historyButton = document.getElementById('historyBtn'); 
  const insightsButton = document.getElementById('insightsBtn')
  const settingsButton = document.getElementById('settingsBtn')

  // DASHBOARD
  homeButton.addEventListener('click', () => {
    const arena = document.getElementById("main-arena");
    arena.innerHTML = "";
    loadHome();
    setActiveButton(homeButton);
  });

  // MENU
  menuButton.addEventListener('click', () => {
    const arena = document.getElementById("main-arena");
    arena.innerHTML = "";
    loadMenu();  //  This will reload fresh data
    setActiveButton(menuButton);
  });

  insightsButton.addEventListener('click', () => {
    const arena = document.getElementById("main-arena");
    arena.innerHTML = "";
    loadInsights();
    setActiveButton(insightsButton);
  });

  // HISTORY
  historyButton.addEventListener('click', () => {
    const arena = document.getElementById("main-arena");
    arena.innerHTML = "";
    loadHistory();  // FIXED
    setActiveButton(historyButton);
  });

  settingsButton.addEventListener('click', () => {
    const arena = document.getElementById("main-arena");
    arena.innerHTML = "";
    loadSettings();
    setActiveButton(settingsButton);

  })


});


