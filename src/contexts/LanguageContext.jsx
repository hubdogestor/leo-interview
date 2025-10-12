import React, { createContext, useContext, useMemo, useState } from 'react';

const LanguageContext = createContext({
  language: 'pt',
  setLanguage: () => {}
});

export function LanguageProvider({ defaultLanguage = 'pt', children }) {
  const [language, setLanguage] = useState(defaultLanguage);

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

