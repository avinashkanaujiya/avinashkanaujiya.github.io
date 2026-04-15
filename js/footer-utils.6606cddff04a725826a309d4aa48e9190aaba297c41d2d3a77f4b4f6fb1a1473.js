(function() {
    'use strict';
    
    // Menu scroll position preservation
    const menu = document.getElementById('menu');
    if (menu) {
        const scrollPosition = localStorage.getItem("menu-scroll-position");
        if (scrollPosition) {
            menu.scrollLeft = parseInt(scrollPosition, 10);
        }
        
        menu.addEventListener('scroll', function() {
            localStorage.setItem("menu-scroll-position", menu.scrollLeft);
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            var id = this.getAttribute("href").substr(1);
            // Sanitize id to prevent XSS - only allow alphanumeric, hyphens, and underscores
            var safeId = id.replace(/[^a-zA-Z0-9_-]/g, '');
            if (safeId !== id) {
                console.warn('Invalid characters in anchor ID, sanitized:', id, '->', safeId);
            }
            var target = document.getElementById(safeId);
            if (!target) {
                // Try with CSS.escape for edge cases
                try {
                    target = document.querySelector('[id="' + safeId.replace(/"/g, '\\"') + '"]');
                } catch (err) {
                    // Ignore query selector errors
                }
            }
            if (target) {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    target.scrollIntoView({
                        behavior: "smooth"
                    });
                } else {
                    target.scrollIntoView();
                }
            }
            if (id === "top") {
                history.replaceState(null, null, " ");
            } else {
                history.pushState(null, null, "#" + id);
            }
        });
    });
})();
