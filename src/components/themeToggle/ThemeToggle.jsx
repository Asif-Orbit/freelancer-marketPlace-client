import { LuSun, LuMoon } from "react-icons/lu";
import useTheme from "../../useTheme";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      className="btn btn-ghost btn-sm btn-outline text-blue-600 mr-1"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={isDark ? "Switch to light" : "Switch to dark"}
    >
      {isDark ? <LuSun /> : <LuMoon />}
      <span className="ml-2 hidden sm:inline ">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
};
export default ThemeToggle;
