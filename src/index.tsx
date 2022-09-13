import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserInputsContextProvider } from './context/UserInputsContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <UserInputsContextProvider>
      <App />
    </UserInputsContextProvider>
  </React.StrictMode>
);
