import { Tooltip } from "@mui/material";
import { ClassValue } from "clsx";
import toast from "react-hot-toast";
import { ThemeChoices } from "~/features/theme/enums/Theme";
import { useTheme } from "~/features/theme/hooks/useTheme";
import { resolveThemeIcon } from "~/features/theme/utils/theme-utils";
import { cn } from "~/shared/classname.utils";
import SimpleButton from "~/shared/SimpleButton";

type ThemeButtonProps = {
  className?: ClassValue;
};

const ThemeButton: React.FC<ThemeButtonProps> = (props) => {
  const { className } = props;
  const { theme, toggleTheme } = useTheme();

  const handleOnClick = (_: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) => {
    const currThemeIndex = ThemeChoices.indexOf(theme);

    if (currThemeIndex < 0) {
      toast.error("No other themes found");
      return;
    }

    const nextTheme = ThemeChoices[(currThemeIndex + 1) % ThemeChoices.length];
    toggleTheme(nextTheme);
  };

  return (
    <Tooltip title={`I'm begging you to change me from ${theme}`}>
      <SimpleButton
        onClickCallback={handleOnClick}
        ariaLabel={`Switch theme, current theme is ${theme}`}
        className={cn(className)}
      >
        {resolveThemeIcon(theme)}
      </SimpleButton>
    </Tooltip>
  );
};

export default ThemeButton;
