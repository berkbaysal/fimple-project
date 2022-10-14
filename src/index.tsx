import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserInputsContextProvider } from './context/UserInputsContext';
import { ResultsContextProvider } from './context/ResultsContext';
import { ThemeProvider } from '@mui/system';
import { appTheme } from './static/theme';
import { LocalizationContextProvider } from './context/LocalizationContext';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

export type Localization = 'en' | 'tr';

function checkLocalization() {
  const storedSetting = localStorage.getItem('lang');
  if (storedSetting && isValidLocalization(storedSetting)) return storedSetting;
  else return 'en';
}

export function isValidLocalization(value: string): value is Localization {
  return value === 'en' || value == 'tr';
}

root.render(
  <React.StrictMode>
    <LocalizationContextProvider init={checkLocalization()}>
      <UserInputsContextProvider>
        <ResultsContextProvider>
          <ThemeProvider theme={appTheme}>
            <App />
          </ThemeProvider>
        </ResultsContextProvider>
      </UserInputsContextProvider>
    </LocalizationContextProvider>
  </React.StrictMode>
);
