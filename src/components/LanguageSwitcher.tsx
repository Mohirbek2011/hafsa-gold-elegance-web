
import React from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant={language === 'ru' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setLanguage('ru')}
        className={language === 'ru' ? 'bg-gold text-black hover:bg-gold/90' : 'hover:text-gold'}
      >
        RU
      </Button>
      <Button 
        variant={language === 'uz' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setLanguage('uz')}
        className={language === 'uz' ? 'bg-gold text-black hover:bg-gold/90' : 'hover:text-gold'}
      >
        UZ
      </Button>
      <Button 
        variant={language === 'en' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setLanguage('en')}
        className={language === 'en' ? 'bg-gold text-black hover:bg-gold/90' : 'hover:text-gold'}
      >
        EN
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
