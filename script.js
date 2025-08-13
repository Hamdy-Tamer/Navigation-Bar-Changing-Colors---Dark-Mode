document.addEventListener("DOMContentLoaded", function() {

    // COLOR PICKER FUNCTIONALITY (NAVBAR)

    const colorOptions = document.querySelectorAll(".color-option");
    
    function updateColors(color) {
        // Update CSS variables
        document.documentElement.style.setProperty("--primary-color", color);
        
        // Convert hex to rgb for Bootstrap's rgba colors
        if (color.startsWith("#")) {
            const r = parseInt(color.substr(1, 2), 16);
            const g = parseInt(color.substr(3, 2), 16);
            const b = parseInt(color.substr(5, 2), 16);
            document.documentElement.style.setProperty("--primary-color-rgb", `${r}, ${g}, ${b}`);
        }
        
        // Update active state
        colorOptions.forEach(option => {
            option.classList.toggle("active", option.getAttribute("data-color") === color);
        });
        
        // Save to localStorage
        localStorage.setItem("selectedColor", color);
    }

    // Load saved color
    const savedColor = localStorage.getItem("selectedColor");
    if (savedColor) updateColors(savedColor);

    // Add click event to color options
    colorOptions.forEach(option => {
        option.addEventListener("click", function() {
            updateColors(this.getAttribute("data-color"));
        });
    });

    
    // DARK MODE TOGGLE (EXCLUDES NAVBAR)

    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;
    const icon = darkModeToggle.querySelector("i");

    function initializeDarkMode() {
        const savedMode = localStorage.getItem("darkMode");
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedMode === "enabled" || (savedMode === null && systemPrefersDark)) {
            enableDarkMode();
        }
    }

    function enableDarkMode() {
        body.classList.add("dark-mode");
        icon.classList.replace("bi-moon-fill", "bi-sun-fill");
        localStorage.setItem("darkMode", "enabled");
    }

    function disableDarkMode() {
        body.classList.remove("dark-mode");
        icon.classList.replace("bi-sun-fill", "bi-moon-fill");
        localStorage.setItem("darkMode", "disabled");
    }

    darkModeToggle.addEventListener("click", function() {
        if (body.classList.contains("dark-mode")) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    // System preference listener
    if (window.matchMedia) {
        const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        colorSchemeQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem("darkMode")) {
                e.matches ? enableDarkMode() : disableDarkMode();
            }
        });
    }

    // Initialize
    initializeDarkMode();
});

//=================================================================================================================================================

/* Scroll to Top */

document.addEventListener('DOMContentLoaded', function() {
            const scrollTopBtn = document.getElementById("scrollTopBtn");

            // Show/Hide the button on scroll
            window.addEventListener('scroll', function() {
                if (window.scrollY > 1500) { //
                    scrollTopBtn.style.display = "block";
                } else {
                    scrollTopBtn.style.display = "none";
                }
            });

            // Scroll to top after clicking on button
            scrollTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
});