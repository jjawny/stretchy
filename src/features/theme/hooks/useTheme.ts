import { Theme } from "~/features/theme/enums/Theme";
import { useUserPreferencesStore } from "~/shared/useUserPreferencesStore";

export const useTheme = () => {
  const theme = useUserPreferencesStore((state) => state.userPreferences.theme);
  const setUserPreferences = useUserPreferencesStore((state) => state.setUserPreferences);
  const toggleTheme = (theme: Theme) => setUserPreferences("theme", theme);

  return { theme, toggleTheme };
};
