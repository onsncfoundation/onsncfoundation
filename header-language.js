/* ==========================================================
   🌎 ONSNC FOUNDATION – HEADER LANGUAGE MODULE
   Civilization 3.0 Web Architecture | 2025
   Modular & Conflict-Free
   ========================================================== */
(() => {
  // ---------- 1️⃣ DOM Elements ----------
  const langToggleBtn = document.getElementById("langToggleBtn");
  const langDropdown = document.getElementById("langDropdown");

  // ---------- 2️⃣ Language Dictionary ----------
  const translations = {
    en: {
      welcome: "Welcome to ONSNC Foundation — Towards Civilization 3.0",
      mission: "Our Mission",
      vision: "Our Vision",
    },
    hi: {
      welcome: "स्वागत है ONSNC फाउंडेशन में — सभ्यता 3.0 की ओर",
      mission: "हमारा मिशन",
      vision: "हमारा विजन",
    },
    as: {
      welcome: "স্বাগতম ONSNC Foundation — সভ্যতা 3.0 ৰ দিশে",
      mission: "আমাৰ লক্ষ্য",
      vision: "আমাৰ দৃষ্টিভংগী",
    },
  };

  // ---------- 3️⃣ Dropdown Toggle ----------
  if (langToggleBtn && langDropdown) {
    langToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      langDropdown.style.display =
        langDropdown.style.display === "block" ? "none" : "block";
    });

    // Close dropdown when clicked outside
    document.addEventListener("click", (event) => {
      if (!langToggleBtn.contains(event.target) && !langDropdown.contains(event.target)) {
        langDropdown.style.display = "none";
      }
    });
  }

  // ---------- 4️⃣ Language Change Function ----------
  window.changeLanguage = function (lang) {
    localStorage.setItem("onsncLanguage", lang);
    applyTranslations(lang);
    if (langDropdown) langDropdown.style.display = "none";

    // Optional: Smooth toast or alert
    console.log("Language switched to:", lang);
  };

  // ---------- 5️⃣ Apply Translations ----------
  function applyTranslations(lang) {
    document.querySelectorAll("[data-key]").forEach((el) => {
      const key = el.getAttribute("data-key");
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
  }

  // ---------- 6️⃣ Initialize Saved Language ----------
  document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("onsncLanguage") || "en";
    applyTranslations(savedLang);
  });
})();/* ==========================================================
   🌎 ONSNC FOUNDATION – HEADER LANGUAGE MODULE
   Civilization 3.0 Web Architecture | 2025
   Modular & Conflict-Free
   ========================================================== */
(() => {
  // ---------- 1️⃣ DOM Elements ----------
  const langToggleBtn = document.getElementById("langToggleBtn");
  const langDropdown = document.getElementById("langDropdown");

  // ---------- 2️⃣ Language Dictionary ----------
  const translations = {
    en: {
      welcome: "Welcome to ONSNC Foundation — Towards Civilization 3.0",
      mission: "Our Mission",
      vision: "Our Vision",
    },
    hi: {
      welcome: "स्वागत है ONSNC फाउंडेशन में — सभ्यता 3.0 की ओर",
      mission: "हमारा मिशन",
      vision: "हमारा विजन",
    },
    as: {
      welcome: "স্বাগতম ONSNC Foundation — সভ্যতা 3.0 ৰ দিশে",
      mission: "আমাৰ লক্ষ্য",
      vision: "আমাৰ দৃষ্টিভংগী",
    },
  };

  // ---------- 3️⃣ Dropdown Toggle ----------
  if (langToggleBtn && langDropdown) {
    langToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      langDropdown.style.display =
        langDropdown.style.display === "block" ? "none" : "block";
    });

    // Close dropdown when clicked outside
    document.addEventListener("click", (event) => {
      if (!langToggleBtn.contains(event.target) && !langDropdown.contains(event.target)) {
        langDropdown.style.display = "none";
      }
    });
  }

  // ---------- 4️⃣ Language Change Function ----------
  window.changeLanguage = function (lang) {
    localStorage.setItem("onsncLanguage", lang);
    applyTranslations(lang);
    if (langDropdown) langDropdown.style.display = "none";

    // Optional: Smooth toast or alert
    console.log("Language switched to:", lang);
  };

  // ---------- 5️⃣ Apply Translations ----------
  function applyTranslations(lang) {
    document.querySelectorAll("[data-key]").forEach((el) => {
      const key = el.getAttribute("data-key");
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
  }

  // ---------- 6️⃣ Initialize Saved Language ----------
  document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("onsncLanguage") || "en";
    applyTranslations(savedLang);
  });
})();

