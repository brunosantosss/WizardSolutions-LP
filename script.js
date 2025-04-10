document.addEventListener("DOMContentLoaded", () => {
    /*
        Verificando a altura do scroll e setando classes de 
        Estilização espeficica para a navbar.
    */
    const navbar = document.getElementById("navbar");
    const stickyOffSet = navbar.offsetTop;

    window.addEventListener('scroll', () => {
        if (window.scrollY > stickyOffSet) {
            navbar.classList.add("nav-sticky");
        } else {
            navbar.classList.remove("nav-sticky");
        }
    });

    // Botão Scroll Continuous da Hero Section.
    const nextSection = document.getElementById("next-section");
    nextSection.addEventListener('click', ()=> {
        nextSection.style.display = "none";
    });

    /*
        Verificações e funções para o sistema de multiplos idiomas.
        - Português (Brasil)
        - Inglês
        - Espanhol
    */
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
                    const currentLang = document.getElementById("current-lang");
                    
                    if (data[key])
                        el.textContent = data[key];

                    if (lang === "pt") 
                        currentLang.textContent = data['footer.lang_pt'];
                    else if (lang === "en")
                        currentLang.textContent = data['footer.lang_en'];
                    else if (lang === "es")
                        currentLang.textContent = data['footer.lang_es'];
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

    // Navbar para mobiles
    const menuMobile = document.getElementById("menu-mobile");
    const menuMobileBTN = document.getElementById("menu-mobile-btn");

    menuMobileBTN.addEventListener('click', () => {
        if (menuMobile.classList.contains("hidden")) {
            menuMobile.classList.remove("hidden");
        }
        else {
            menuMobile.classList.add("hidden");
        }
    });
});
