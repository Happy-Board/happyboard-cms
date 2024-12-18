// "use client";

// import { createContext, useState, useContext, useEffect } from "react";

// const themes = {
//   dark: {
//     bg: "#151c2c",
//     bgSoft: "#182237",
//     bgSofter: "#2e374a",
//     text: "white",
//     textSoft: "#b7bac1",
//     textSofter: "rgb(218, 216, 216)",
//   },
//   light: {
//     bg: "#c1c5cb",
//     bgSoft: "#d1d5db",
//     bgSofter: "#a9afb7",
//     text: "#111827",
//     textSoft: "#374151",
//     textSofter: "#4b5563",
//   },
// };

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState("dark");

//   const toggleTheme = () => {
//     setTheme(theme === "dark" ? "light" : "dark");
//   };

//   useEffect(() => {
//     const root = document.documentElement;
//     Object.entries(themes[theme]).forEach(([key, value]) => {
//       root.style.setProperty(`--${key}`, value);
//     });
//   }, [theme]);

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);
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
    bg: "#c1c5cb",
    bgSoft: "#d1d5db",
    bgSofter: "#a9afb7",
    text: "#111827",
    textSoft: "#374151",
    textSofter: "#4b5563",
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;

    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDarkMode ? "dark" : "light";
  };

  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(themes[theme]).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleThemeChange = (e) => {
      if (!localStorage.getItem("theme")) {
        const newTheme = e.matches ? "dark" : "light";
        setTheme(newTheme);
      }
    };

    handleThemeChange(mediaQuery);

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
