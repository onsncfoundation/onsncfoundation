// i18n.js
// Exports helper to load and apply locales.
// Adjust I18N_PATH if you host JSON in a different location.

export const LANG_KEY = 'onsnc_lang';
export const AVAILABLE = ['en','hi','as'];
export const I18N_PATH = '/i18n'; // change if needed

const FALLBACK = {
  en: { version:"1.0", nav_home:"Home", nav_about:"About", nav_stories:"Stories", nav_contact:"Contact", hero_title:"Welcome to ONSNC Foundation", hero_sub:"Building resilient communities through shared stories and tools.", donate:"Donate", aria_lang_label:"Choose language" },
  hi: { version:"1.0", nav_home:"मुख्य पृष्ठ", nav_about:"हमारे बारे में", nav_stories:"कहानियाँ", nav_contact:"संपर्क", hero_title:"ON SNC फाउंडेशन में आपका स्वागत है", hero_sub:"साझा कहानियों और उपकरणों के माध्यम से स्थिर समुदाय बनाना।", donate:"दान करें", aria_lang_label:"भाषा चुनें" },
  as: { version:"1.0", nav_home:"মূল পৃষ্ঠা", nav_about:"আমাৰ বিষয়ে", nav_stories:"গল্পসমূহ", nav_contact:"যোগাযোগ", hero_title:"ON SNC ফাউণ্ডেশ্যনত আপোনালোকক স্বাগতম", hero_sub:"শ্বেয়াৰ কৰা কাহিনীৰে আৰু সঁজুলিৰে টেকসই সমাজ নিৰ্মাণ।", donate:"দান কৰক", aria_lang_label:"ভাষা নিৰ্বাচন কৰক" }
};

export async function fetchLocale(lang){
  if(!AVAILABLE.includes(lang)) lang = 'en';
  const cached = sessionStorage.getItem(`i18n_${lang}`);
  if(cached) return JSON.parse(cached);
  try{
    const res = await fetch(`${I18N_PATH}/${lang}.json`, {cache:'force-cache'});
    if(!res.ok) throw new Error('Locale fetch failed');
    const dict = await res.json();
    sessionStorage.setItem(`i18n_${lang}`, JSON.stringify(dict));
    return dict;
  }catch(e){
    return FALLBACK[lang] || FALLBACK['en'];
  }
}

export function applyDictToDOM(dict, lang){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(key && dict[key]) el.textContent = dict[key];
  });
  document.documentElement.lang = lang;
  const label = document.getElementById('lang-label');
  if(label) label.textContent = dict['aria_lang_label'] || label.textContent;
}

