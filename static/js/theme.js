document.addEventListener('DOMContentLoaded', () => {

    const themeStylesheet = document.getElementById('theme');
    const storedTheme = localStorage.getItem('theme');

    // load correct theme when DOM loads
    if (storedTheme) {
      if (storedTheme != themeStylesheet.href) {
        loadTheme();
      }
    }

    // if toggle clicked, change theme
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', loadTheme)

    // if stylesheet dark, turn toggle on
    const toggle = document.getElementById("theme-toggle");
    (themeStylesheet.href.includes('light')) ? toggle.checked = false : toggle.checked = true;

})


function loadTheme() {

  const themeStylesheet = document.getElementById('theme');
  const darkModeBtns = document.getElementsByClassName('dark-mode-btn'); // bootstrap buttons

  if (themeStylesheet.href.includes('light')) { // if it's light -> go dark

      // change stylesheet
      themeStylesheet.href = 'static/css/dark-theme.css';

      // change navbar
      navbar = document.getElementById("navbar");
      navbar.classList.remove("navbar-light");
      navbar.classList.add("navbar-dark");

      if (darkModeBtns) { // change bootstrap class for button
        for (let i = 0; i < darkModeBtns.length; i++) {
          darkModeBtns[i].classList.remove('btn-outline-dark');
          darkModeBtns[i].classList.add('btn-outline-light');
        }
      }

  } else { // if it's dark -> go light

      // change stylesheet
      themeStylesheet.href = 'static/css/light-theme.css';

      // change navbar
      navbar = document.getElementById("navbar");
      navbar.classList.add("navbar-light");
      navbar.classList.remove("navbar-dark");

      if (darkModeBtns) { // change bootstrap class for button
        for (let i = 0; i < darkModeBtns.length; i++) {
          darkModeBtns[i].classList.remove('btn-outline-light');
          darkModeBtns[i].classList.add('btn-outline-dark');
        }
      }
  }

  // save the preference to localStorage
  localStorage.setItem('theme',themeStylesheet.href)

}
