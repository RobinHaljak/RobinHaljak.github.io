// ModeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ModeContext = createContext();

export const useMode = () => useContext(ModeContext);

export const ModeProvider = ({ children }) => {
  const storedMode = localStorage.getItem('mode');
  const [isDarkMode, setIsDarkMode] = useState(storedMode === 'dark');

  useEffect(() => {
    const mode = isDarkMode ? 'dark-mode' : 'light-mode';
    localStorage.setItem('mode', mode);
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(mode);
  }, [isDarkMode]);

  return (
    <ModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ModeContext.Provider>
  );
};
