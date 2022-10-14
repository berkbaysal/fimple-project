import React, { createContext, useContext } from 'react';

type Localization = 'en' | 'tr';

const LocalizationContext = createContext<Localization>('en');

function useLocalizationContext() {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('ResultsContext is undefined');
  }
  return context;
}

const LocalizationContextProvider = () => {
  return <div>LocalizationContext</div>;
};

export { useLocalizationContext, LocalizationContextProvider };
