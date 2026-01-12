
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Default to light mode unless saved otherwise
  const [theme, setTheme] = useState(() => {
    try {
        const saved = localStorage.getItem('theme');
        return saved || 'light';
    } catch (e) {
        return 'light';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    // Remove previous attribute to avoid conflicts if logic changes
    root.removeAttribute('data-theme');
    
    // Set new attribute
    root.setAttribute('data-theme', theme);
    
    // Persist
    try {
        localStorage.setItem('theme', theme);
    } catch (e) {
        console.warn('Failed to save theme preference', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
