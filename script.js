document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const stickyOffSet = navbar.offsetTop;

    window.addEventListener('scroll', () => {
        if (window.scrollY > stickyOffSet) {
        navbar.classList.add("nav-sticky");
        } else {
        navbar.classList.remove("nav-sticky");
        }
    });

    const nextSection = document.getElementById("next-section");
    nextSection.addEventListener('click', ()=> {
        nextSection.style.display = "none";
    });

    const langsButton = document.getElementById("langs-button");
    const langsDropdown = document.getElementById("langs-dropdown");
    langsButton.addEventListener('click', () => {
        if (langsDropdown.classList.contains("hidden")) {
            langsDropdown.classList.remove("hidden");
        }
        else {
            langsDropdown.classList.add("hidden");
        }
    });

    document.querySelectorAll(".dropdown-item").forEach((item) => {
        if (item.addEventListener('click', () => {
            if (!langsDropdown.classList.contains("hidden"))
                langsDropdown.classList.add("hidden");
        }));
    });

    function loadLanguage(lang) {
        fetch(`lang/${lang}.json`)
            .then(res => res.json())
            .then(data => {
                document.querySelectorAll('[data-i18n]').forEach(el => {
                    const key = el.getAttribute('data-i18n');
                    if (data[key])
                        el.textContent = data[key];
                });
                localStorage.setItem('lang', lang);
            });
    }
    
    document.querySelectorAll(".dropdown-item").forEach((item) => {
        item.addEventListener('click', () => {
            const lang = item.getAttribute('data-value');
            loadLanguage(lang);
        });
    });
    
    const savedLang = localStorage.getItem('lang') || navigator.language.slice(0, 2);
    loadLanguage(savedLang);
});
