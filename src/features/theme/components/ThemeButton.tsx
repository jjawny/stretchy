import { Tooltip } from "@mui/material";
import toast from "react-hot-toast";
import { ThemeChoices } from "~/features/theme/enums/Theme";
import { useTheme } from "~/features/theme/hooks/useTheme";
import { resolveThemeIcon } from "~/features/theme/utils/theme-utils";

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  const handleOnClick = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const currThemeIndex = ThemeChoices.indexOf(theme);

    if (currThemeIndex < 0) {
      toast.error("No other themes found.");
      return;
    }

    const nextTheme = ThemeChoices[(currThemeIndex + 1) % ThemeChoices.length];
    toggleTheme(nextTheme);
  };

  return (
    <Tooltip title={`I'm begging you to change me from ${theme}`}>
      <button
        onClick={(e) => handleOnClick(e)}
        aria-label={`Switch theme, current theme is ${theme}`}
        className="absolute bottom-10 right-10 w-16 select-none rounded-md border border-solid border-stone-300 bg-stone-100 px-1 text-xs text-black transition-all duration-200 hover:bg-stone-300"
      >
        {resolveThemeIcon(theme)}
      </button>
    </Tooltip>
  );
};

export default ThemeButton;
