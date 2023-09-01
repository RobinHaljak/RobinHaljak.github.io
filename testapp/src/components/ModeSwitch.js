// ModeSwitcher.js
import React from 'react';
import { useMode } from './ModeContext';
import './ModeSwitch.css';

function ModeSwitcher() {
  const { isDarkMode, setIsDarkMode } = useMode();

  return (
    <button
      className={`mode-switcher ${isDarkMode ? 'dark' : 'light'}`}
      onClick={() => setIsDarkMode(!isDarkMode)}
    >
      {isDarkMode ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
}

export default ModeSwitcher;
