const themeToggleButton = document.getElementById('theme-toggle');
const storedTheme = localStorage.getItem('askvoltie-theme') || 'dark';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (themeToggleButton) {
    themeToggleButton.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
  }
  localStorage.setItem('askvoltie-theme', theme);
}

if (themeToggleButton) {
  applyTheme(storedTheme);
  themeToggleButton.addEventListener('click', () => {
    const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
} else {
  applyTheme(storedTheme);
}
