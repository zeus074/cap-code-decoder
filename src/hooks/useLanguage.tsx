
import { useState } from 'react';

type Language = 'it' | 'en';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('it');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'it' ? 'en' : 'it');
  };

  return { language, toggleLanguage };
};
