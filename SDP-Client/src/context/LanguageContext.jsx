import React, { createContext, useContext, useState, useEffect } from 'react';

// Language Context
const LanguageContext = createContext();

// Language Provider Component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get saved language from localStorage or default to English
    return localStorage.getItem('sdp-language') || 'en';
  });

  // Save language to localStorage whenever it changes and trigger Google Translate
  useEffect(() => {
    localStorage.setItem('sdp-language', language);

    const tryTranslate = (attempts = 0) => {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = language;
        select.dispatchEvent(new Event('change'));
      } else if (attempts < 15) {
        setTimeout(() => tryTranslate(attempts + 1), 300);
      }
    };
    tryTranslate();
  }, [language]);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const value = {
    language,
    changeLanguage,
    isKannada: language === 'kn'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;