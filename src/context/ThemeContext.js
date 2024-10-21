// src/context/ThemeContext.js
import React, { createContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Создаём контекст для управления цветовой схемой
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  // Функция переключения темы
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  // Определяем пользовательские цвета для тем
  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // Светлая тема
            primary: {
              main: '#FFC107', // Жёлтый цвет
            },
            background: {
              default: '#FFFFFF',
              paper: '#FFFFFF',
            },
            text: {
              primary: '#000000',
            },
          }
        : {
            // Тёмная тема
            primary: {
              main: '#808080', // Чёрный цвет
            },
            background: {
              default: '#121212',
              paper: '#121212',
            },
            text: {
              primary: '#FFFFFF',
            },
          }),
    },
  });

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
