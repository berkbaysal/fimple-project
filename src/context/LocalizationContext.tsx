import React, { createContext, useContext, useEffect, useState } from 'react';

type Localization = 'en' | 'tr';

interface LocalizationContext {
  localization: Localization;
  updateLocalization: (userChoice: string) => void;
}

const LocalizationContext = createContext<LocalizationContext | undefined>(undefined);

function useLocalizationContext() {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('LocalizationContext is undefined');
  }
  return context;
}

interface IProps {
  children: JSX.Element;
}

const LocalizationContextProvider = ({ children }: IProps) => {
  const [localization, setLocalization] = useState<Localization>('en');

  function checkLocalization() {
    const storedSetting = localStorage.getItem('lang');
    if (storedSetting && isValidLocalization(storedSetting)) setLocalization(storedSetting);
  }

  function updateLocalization(userChoice: string) {
    if (isValidLocalization(userChoice)) {
      setLocalization(userChoice);
      localStorage.setItem('lang', userChoice);
    }
  }

  function isValidLocalization(value: string): value is Localization {
    return value === 'en' || value == 'tr';
  }

  useEffect(() => {
    checkLocalization();
  }, []);

  return (
    <LocalizationContext.Provider value={{ localization: localization, updateLocalization: updateLocalization }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export { useLocalizationContext, LocalizationContextProvider };
