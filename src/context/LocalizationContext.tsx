import React, { createContext, useContext, useEffect, useState } from 'react';
import { Localization, isValidLocalization } from '../index';

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
  init: Localization;
}

const LocalizationContextProvider = ({ children, init }: IProps) => {
  const [localization, setLocalization] = useState<Localization>(init);

  function updateLocalization(userChoice: string) {
    if (isValidLocalization(userChoice)) {
      setLocalization(userChoice);
      localStorage.setItem('lang', userChoice);
    }
  }

  return (
    <LocalizationContext.Provider value={{ localization: localization, updateLocalization: updateLocalization }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export { useLocalizationContext, LocalizationContextProvider, isValidLocalization };
