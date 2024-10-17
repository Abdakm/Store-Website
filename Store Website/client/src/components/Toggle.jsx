import './toggle.css';
import { FaMoon, FaSun } from "react-icons/fa";
import { useState, useEffect } from 'react';

export default function Toggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      setIsDarkMode(theme === 'dark');
      document.body.className = theme
    }
  }, []);

  const handleToggle = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme; // Optionally, apply the theme to the body element
  };

  return (
    <div>
      <input
        type="checkbox"
        className="checkbox"
        id="checkbox"
        checked={isDarkMode}
        onChange={handleToggle}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      />
      <label htmlFor="checkbox" className="checkbox-label">
        <FaMoon />
        <FaSun />
        <span className="ball"></span>
      </label>
    </div>
  );
}
