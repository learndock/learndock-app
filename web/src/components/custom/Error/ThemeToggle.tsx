import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { getStorageValue } from "../../../storage/StorageProvider";

export const ThemeToggle: React.FC<{ onToggle?: (dark: boolean) => void }> = ({ onToggle }) => {
  const [dark, setDark] = useState(getStorageValue("fallbackTheme") == "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleClick = () => {
    setDark(prev => !prev);
    onToggle?.(dark);
  };

  return (
    <button
      onClick={() => handleClick()}
      className="absolute top-4 left-4 p-2 rounded-full shadow bg-cards text-text-primary hover:bg-accent transition"
      aria-label="Toggle Theme"
    >
      {dark ? <FaSun size={18} /> : <FaMoon size={18} />}
    </button>
  );
};
