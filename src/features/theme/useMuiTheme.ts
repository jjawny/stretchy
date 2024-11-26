import { createTheme, PaletteOptions } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { darkPalette, lightPalette } from "~/features/theme/palette.constants";
import { Theme } from "~/features/theme/Theme.enum";
import { useTheme } from "~/features/theme/useTheme";

/**
 * Resolves app's theme managed separately via chosen tech (Zustand/ReactQuery/etc)
 * @returns the MUI-compatible theme
 */
export const useMuiTheme = () => {
  const { theme } = useTheme(); // chosen tech
  const [resolvedTheme, setResolvedTheme] = useState<PaletteOptions | undefined>(undefined);

  const applyTheme = (e: MediaQueryListEvent | null = null) => {
    let isDarkMode = false;

    if (theme === Theme.System) {
      isDarkMode = (e && e.matches) || window.matchMedia("(prefers-color-scheme: dark)").matches;
    } else {
      isDarkMode = theme === Theme.Dark;
    }

    setResolvedTheme(isDarkMode ? darkPalette : lightPalette);
  };

  useEffect(function listenToSystemThemeChanges() {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", applyTheme);

    return () => {
      mediaQuery.removeEventListener("change", applyTheme);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    function syncTheme() {
      applyTheme();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme],
  );

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: resolvedTheme,
        components: {
          MuiCssBaseline: {
            styleOverrides: (theme) => {
              const isDarkMode = theme.palette.mode === "dark";
              return {
                body: {
                  backgroundImage: `radial-gradient(circle, ${isDarkMode ? "#404040" : "#dadada"}  0.5px, transparent 0.5px)`, // dots
                  backgroundSize: "11px 11px", // dot spacing
                  backgroundColor: isDarkMode ? "#252423" : "#f7f7f7",
                  transition: "background-color 0.2s ease-in-out",
                },
              };
            },
          },
        },
      }),
    [resolvedTheme],
  );

  return { muiTheme };
};
