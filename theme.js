// Theme switcher functionality
function initializeThemeSwitcher() {
    const html = document.documentElement;
    const themeSwitcher = document.createElement('div');
    themeSwitcher.className = 'theme-switcher';
    
    // Create sun/moon icon
    const icon = document.createElement('div');
    icon.className = 'sun';
    themeSwitcher.appendChild(icon);

    // Add to document
    document.body.appendChild(themeSwitcher);

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    updateTheme(initialTheme);

    // Theme switch event listener
    themeSwitcher.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        updateTheme(newTheme);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                updateTheme(e.matches ? 'dark' : 'light');
            }
        });

    function updateTheme(newTheme) {
        // Add transition class
        document.body.classList.add('theme-transition');
        
        // Update theme
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme === 'dark' ? 'moon' : 'sun');
        
        // Remove transition class after animation
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    }

    function updateIcon(type) {
        icon.className = type;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeThemeSwitcher);

// Prevent flash of wrong theme
const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', savedTheme);