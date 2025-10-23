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




// top-header-lang.js
(() => {
  const LANG_KEY = 'onsnc_lang';
  const AVAILABLE = ['en','hi','as'];
  const I18N_PATH = '/i18n'; // update to where your JSON files live
  const SELECT_ID = 'lang-select';
  const BRAND_SELECTOR = '#onsnc-brand';
  const LABEL_ID = 'lang-label';

  const FALLBACK = {
    en: { hero_title: "Welcome to ONSNC Foundation", aria_lang_label: "Choose language" },
    hi: { hero_title: "ON SNC फाउंडेशन में आपका स्वागत है", aria_lang_label: "भाषा चुनें" },
    as: { hero_title: "ON SNC ফাউণ্ডেশ্যনত আপোনালোকক স্বাগতম", aria_lang_label: "ভাষা নিৰ্বাচন কৰক" }
  };

  async function fetchLocale(lang) {
    if (!AVAILABLE.includes(lang)) lang = 'en';
    const cacheKey = `i18n_${lang}`;
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) return JSON.parse(cached);
      const res = await fetch(`${I18N_PATH}/${lang}.json`, { cache: 'force-cache' });
      if (!res.ok) throw new Error('Locale fetch failed');
      const dict = await res.json();
      sessionStorage.setItem(cacheKey, JSON.stringify(dict));
      return dict;
    } catch (e) {
      return FALLBACK[lang] || FALLBACK.en;
    }
  }

  function applyDict(dict, lang) {
    const brand = document.querySelector(BRAND_SELECTOR);
    if (brand && dict.hero_title) brand.textContent = dict.hero_title;
    const label = document.getElementById(LABEL_ID);
    if (label && dict.aria_lang_label) label.textContent = dict.aria_lang_label;
    document.documentElement.lang = lang;
  }

  async function setLanguage(lang) {
    const dict = await fetchLocale(lang);
    applyDict(dict, lang);
    try { localStorage.setItem(LANG_KEY, lang); } catch {}
    const sel = document.getElementById(SELECT_ID);
    if (sel && sel.value !== lang) sel.value = lang;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const sel = document.getElementById(SELECT_ID);
    if (!sel) return;
    const saved = localStorage.getItem(LANG_KEY) || navigator.language?.slice(0,2) || 'en';
    const initial = AVAILABLE.includes(saved) ? saved : 'en';
    setLanguage(initial);
    sel.addEventListener('change', (e) => setLanguage(e.target.value));
  });
})();
