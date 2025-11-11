import { useEffect, useState } from "react";

const useTheme = () => {
  const getInitial = () => {
    const saved = localStorage.getItem("fm-theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = useState(getInitial);

  useEffect(() => {
    localStorage.setItem("fm-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, setTheme };
};
export default useTheme;
