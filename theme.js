(function() {
    var THEME_KEY = 'snapnutrition_theme';
    var html = document.documentElement;
    var buttons = document.querySelectorAll('.theme-toggle-group button');

    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        buttons.forEach(function(btn) {
            var isActive = btn.getAttribute('data-theme-value') === theme;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-checked', isActive ? 'true' : 'false');
        });
    }

    var saved = localStorage.getItem(THEME_KEY) || 'system';
    applyTheme(saved);

    buttons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var theme = btn.getAttribute('data-theme-value');
            localStorage.setItem(THEME_KEY, theme);
            applyTheme(theme);
        });
    });
})();
