"use client";

import { createContext, useState, useContext, useEffect } from "react";

const themes = {
  dark: {
    bg: "#151c2c",
    bgSoft: "#182237",
    bgSofter: "#2e374a",
    text: "white",
    textSoft: "#b7bac1",
    textSofter: "rgb(218, 216, 216)",
  },
  light: {
    bg: "#a9a8b7",
    bgSoft: "rgb(180, 156, 160)",
    bgSofter: "rgb(215, 193, 196)",
    text: "#111827",
    textSoft: "#262b32",
    textSofter: "#24282e",
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(themes[theme]).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
