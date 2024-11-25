import { useEffect } from "react";
import { Theme } from "~/enums/Theme";
import { useUserPreferencesStore } from "~/hooks/useUserPreferencesStore";

export const useTheme = () => {
  const theme = useUserPreferencesStore((state) => state.userPreferences.theme);
  const setUserPreferences = useUserPreferencesStore((state) => state.setUserPreferences);
  const toggleTheme = (theme: Theme) => setUserPreferences("theme", theme);

  // Not wrapped in useCallback - invoked 'fresh' per event
  const applySystemTheme = (e: MediaQueryListEvent | null = null) => {
    if (theme !== Theme.System) return;

    // Edge-case: Upon 1st render OR user has just selected 'system', but a system theme change hasn't happened yet, no event is heard...
    // Solution: No event? Check the system theme again (via matchMedia)
    const isDarkMode = e ? e.matches : window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = isDarkMode ? Theme.Dark : Theme.Light;
    document.documentElement.setAttribute("theme", nextTheme);
  };

  useEffect(function listenToSystemThemeChanges() {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", applySystemTheme);

    return () => {
      mediaQuery.removeEventListener("change", applySystemTheme);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    function syncTheme() {
      applySystemTheme();
      const root = document.documentElement;
      if (theme === Theme.Dark) root.setAttribute("theme", Theme.Dark);
      else if (theme === Theme.Light) root.setAttribute("theme", Theme.Light);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme],
  );

  return { theme, toggleTheme };
};
