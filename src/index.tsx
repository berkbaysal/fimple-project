import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserInputsContextProvider } from './context/UserInputsContext';
import { DisabledComponentsContextProvider } from './context/DisabledComponentsContext';
import { ThemeProvider } from '@mui/system';
import { appTheme } from './theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <UserInputsContextProvider>
      <DisabledComponentsContextProvider>
        <ThemeProvider theme={appTheme}>
          <App />
        </ThemeProvider>
      </DisabledComponentsContextProvider>
    </UserInputsContextProvider>
  </React.StrictMode>
);
