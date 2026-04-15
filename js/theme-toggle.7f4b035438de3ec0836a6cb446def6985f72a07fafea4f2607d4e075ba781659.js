// Three-way theme toggle: light → dark → auto → light
(function() {
  // Initialize theme on load
  function initTheme() {
    const userTheme = localStorage.getItem('user-theme');
    if (userTheme === 'light' || userTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', userTheme);
    } else {
      // Auto mode - check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
  }

  // Get current theme mode
  function getCurrentMode() {
    const userTheme = localStorage.getItem('user-theme');
    if (userTheme === 'light' || userTheme === 'dark') {
      return userTheme;
    }
    return 'auto';
  }

  // Update icon and aria-label based on mode
  function updateToggleButton(mode) {
    const button = document.getElementById('theme-toggle');
    if (!button) return;

    // Set data-mode for CSS styling - CSS handles the icon visibility
    button.setAttribute('data-mode', mode);
    
    if (mode === 'light') {
      button.setAttribute('aria-label', 'Theme: Light (click for Dark)');
      button.title = 'Light mode (click for Dark)';
    } else if (mode === 'dark') {
      button.setAttribute('aria-label', 'Theme: Dark (click for Auto)');
      button.title = 'Dark mode (click for Auto)';
    } else {
      button.setAttribute('aria-label', 'Theme: Auto (click for Light)');
      button.title = 'Auto mode (click for Light)';
    }
  }

  // Cycle: light → dark → auto → light
  function toggleTheme(e) {
    // Prevent the default PaperMod handler
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
    
    const currentMode = getCurrentMode();
    let newMode;

    if (currentMode === 'light') {
      newMode = 'dark';
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('user-theme', 'dark');
    } else if (currentMode === 'dark') {
      newMode = 'auto';
      // Auto mode - check system preference and apply immediately
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
      localStorage.removeItem('user-theme');
    } else {
      newMode = 'light';
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('user-theme', 'light');
    }

    updateToggleButton(newMode);
  }

  // Initialize on page load
  initTheme();

  // Wait for DOM and PaperMod scripts to load, then override
  function setupToggle() {
    const button = document.getElementById('theme-toggle');
    if (!button) return;

    // Update button to current mode
    updateToggleButton(getCurrentMode());

    // Replace the button with a clone to remove all event listeners
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
    
    // Add our custom click handler
    newButton.addEventListener('click', toggleTheme, true);
  }

  // Run after PaperMod scripts have loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupToggle);
  } else {
    // DOM already loaded, wait a tick for PaperMod's script
    setTimeout(setupToggle, 0);
  }
})();
