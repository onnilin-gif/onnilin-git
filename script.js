document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    const htmlEl = document.documentElement;

    // Function to set the theme
    const setTheme = (theme) => {
        htmlEl.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggle.checked = theme === 'dark';
    };

    // Event listener for the toggle
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    });

    // Initial theme setup on page load
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
});
