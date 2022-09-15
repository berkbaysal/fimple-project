import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserInputsContextProvider } from './context/UserInputsContext';
import { ThemeProvider } from '@mui/system';
import { appTheme } from './static/theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <UserInputsContextProvider>
      <ThemeProvider theme={appTheme}>
        <App />
      </ThemeProvider>
    </UserInputsContextProvider>
  </React.StrictMode>
);
