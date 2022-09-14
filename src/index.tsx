import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserInputsContextProvider } from './context/UserInputsContext';
import { DisabledComponentsContextProvider } from './context/DisabledComponentsContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <UserInputsContextProvider>
      <DisabledComponentsContextProvider>
        <App />
      </DisabledComponentsContextProvider>
    </UserInputsContextProvider>
  </React.StrictMode>
);
