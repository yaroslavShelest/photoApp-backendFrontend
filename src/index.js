// Импортируйте createRoot вместо ReactDOM.render
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CustomThemeProvider } from './context/ThemeContext';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <CustomThemeProvider>
     <BrowserRouter> <App /></BrowserRouter>
   
  </CustomThemeProvider>
);
